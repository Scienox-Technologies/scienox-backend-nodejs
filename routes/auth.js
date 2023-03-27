const express = require('express')
const router = express.Router()


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;



const ERR_USER_ALREADY_EXISTS = "ERR_USER_ALREADY_EXISTS"
const ERR_INSUFFICIENT_REQ = "ERR_INSUFFICIENT_REQ"
const ERR_INVALID_CREDENTIALS = "ERR_INVALID_CREDENTIALS"



// app.use(express.json());
router.use(express.json())


require("dotenv").config();
// require("../config/mongoose").connect();




// importing user context
const User = require("../models/user");


router.get("/register", async (req, res) => {
    res.send("register")
})

// Register
router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            return res.status(400).send({ MSG: "All input is required", ERR: ERR_INSUFFICIENT_REQ });
        }

        // check if user already exist
        const oldUser = await User.findOne({ email: email });
        if (oldUser) {
            return res.status(400).send({ MSG: "User already exists, please login", ERR: ERR_USER_ALREADY_EXISTS });
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

        const userType = user.userType

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email, userType },
            JWT_PRIVATE_KEY,
            { expiresIn: "2h" }
        );

        // return new user
        res.status(201).send({ user, token });
    } catch (err) {
        console.log(err);
    }
});






router.get("/login", async (req, res) => {
    res.send("login")
})

// Login
router.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send({ MSG: "All input is required", ERR: ERR_INSUFFICIENT_REQ });
        }

        // Validate if user exist in our database
        const user = await User.findOne({ email: email })

        if (user && (await bcrypt.compare(password, user.password), (err) => {
            console.log(err)
        })) {

            const userType = user.userType

            // Create token
            const token = jwt.sign(
                { user_id: user._id, email, userType },
                JWT_PRIVATE_KEY,
                { expiresIn: "2h" }
            );

            return res.status(200).send({ user, token });
        }

        return res.status(400).send({ MSG: "Invalid Credentials", ERR: ERR_INVALID_CREDENTIALS });
    } catch (err) {
        console.log(err);
    }
});



module.exports = router;