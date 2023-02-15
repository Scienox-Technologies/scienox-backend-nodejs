const express = require('express')
const router = express.Router()


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");





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

    // Our register logic starts here
    try {
        // Get user input

        //
        // console.log(req, res)
        //

        const { first_name, last_name, email, username, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            username: username,
            password: encryptedPassword,
        });
        console.log(user.password)

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_SECRET_TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json({ user, token });
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});






router.get("/login", async (req, res) => {
    res.send("login")
})

// Login
router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {

        // console.log(req.body)
        // Get user input
        const { username, password } = req.body;

        // Validate user input
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ username: username })
        // console.log("password", password)
        // console.log("user.password", user.password)
        // console.log("user", user)

        if (user && (await bcrypt.compare(password, user.password), (err) => {
            console.log(err)
        })) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, username },
                process.env.JWT_SECRET_TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            return res.status(200).json({user, token});
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});



module.exports = router;