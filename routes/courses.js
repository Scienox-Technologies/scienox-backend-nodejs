const express = require('express')
const router = express.Router()


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;



const ERR_INVALID_USER_TYPE = "ERR_INVALID_USER_TYPE"
const ERR_NO_USERS_FOUND = "ERR_NO_USERS_FOUND"
const ERR_INVALID_USER_ID = "ERR_INVALID_USER_ID"
const ERR_USER_ALREADY_DELETED = "ERR_USER_ALREADY_DELETED"
const ERR_USER_ALREADY_EXISTS = "ERR_USER_ALREADY_EXISTS"



// app.use(express.json());
router.use(express.json())


require("dotenv").config();
// require("../config/mongoose").connect();




// importing user context
const User = require("../models/user");


// router.get("/:id", async (req, res) => {
//     res.send("register")
// })



const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyAuth.js");


// Get all users
router.get("/all", verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 })

        if (!users.length) {
            return res.status(409).send({ MSG: "No users found", ERR: ERR_NO_USERS_FOUND });
        }

        return res.status(201).send(users);
    } catch (err) {
        console.log(err);
    }
});


// Get all users of same type
router.get("/all/:userType", verifyTokenAndAdmin, async (req, res) => {
    try {
        const userType = req.params.userType.slice(0, req.params.userType.length - 1)
        userTypes = ["admin", "instructor", "student"]
        const VALID_USER_TYPE = userTypes.includes(userType)

        if (!VALID_USER_TYPE) {
            return res.status(409).send({ MSG: "Invalid user type in request URL", ERR: ERR_INVALID_USER_TYPE });
        }

        const users = await User.find({ userType }, { password: 0 })

        if (!users.length) {
            return res.status(409).send({ MSG: "No users found", ERR: ERR_NO_USERS_FOUND });
        }

        return res.status(201).send(users);
    } catch (err) {
        console.log(err);
    }
});


// Get Individual User
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(409).send({ MSG: "No user with given id", ERR: ERR_INVALID_USER_ID });
        }

        const { password, ...others } = user._doc;
        return res.status(201).send(others);
        // return res.status(201).send(user);
    } catch (err) {
        console.log(err);
    }
});




// Delete User
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        const NO_USER = !user
        const USER_IS_DELETED = (user && user.isDeleted) ? true : false

        if (NO_USER) {
            return res.status(409).send({ MSG: "No user with given id", ERR: ERR_INVALID_USER_ID });
        }
        else if (USER_IS_DELETED) {
            return res.status(409).send({ MSG: "User already deleted", ERR: ERR_USER_ALREADY_DELETED });
        }

        const deletedUser = await User.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true, deletedAt: Date.now() },
            { new: true }
        )

        return res.status(200).send(deletedUser);
    } catch (err) {
        console.log(err);
    }
});



// Update User
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        const NO_USER = !user
        const USER_IS_DELETED = (user && user.isDeleted) ? true : false

        if (NO_USER) {
            return res.status(409).send({ MSG: "No user with given id", ERR: ERR_INVALID_USER_ID });
        }
        else if (USER_IS_DELETED) {
            return res.status(409).send({ MSG: "User already deleted", ERR: ERR_USER_ALREADY_DELETED });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        return res.status(200).send(updatedUser);
    } catch (err) {
        console.log(err);
    }
});






router.post("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            return res.status(400).send({ MSG: "All input is required", ERR: ERR_INSUFFICIENT_REQ });
        }

        // check if user already exist
        const oldUser = await User.findOne({ email: email });
        if (oldUser) {
            return res.status(400).send({ MSG: "User already exists", ERR: ERR_USER_ALREADY_EXISTS });
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        // Create user in database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword
        });

        // return new user
        res.status(201).send(user);
    } catch (err) {
        console.log(err);
    }
});




module.exports = router;