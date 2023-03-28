require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Admin = require("../../models/Admin")
const Student = require("../../models/Student")
const Instructor = require("../../models/Instructor")

const RES_CODES = require("../../constants/resCodes.js")

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
const JWT_TOKEN_VALIDITY = process.env.JWT_TOKEN_VALIDITY


const registerUser = async (req, res) => {
    try {
        // Get user input
        const {
            user_type,
            first_name,
            last_name,
            email,
            password
        } = req.body

        // Validate user input
        const IS_VALID_INPUT = email && password && first_name && last_name && user_type
        if (!IS_VALID_INPUT) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "All input is required", ERR: RES_CODES.ERR_INSUFFICIENT_REQ })
        }

        // Validate user type
        const IS_VALID_USER_TYPE = user_type === "student" || user_type === "instructor"
        if (!IS_VALID_USER_TYPE) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "Invalid user type", ERR: RES_CODES.ERR_INVALID_USER_TYPE })
        }

        var User
        if (user_type === "student") {
            User = Student
        }
        else if (user_type === "instructor") {
            User = Instructor
        }

        // Check if user already exist
        const oldUser = await User.findOne({ email: email })
        if (oldUser) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "User already exists, please login", ERR: RES_CODES.ERR_USER_ALREADY_EXISTS })
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10)
        // Create user in database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword
        })

        const user_id = user._id

        // Create token
        const token = jwt.sign(
            { user_id, email, user_type },
            JWT_PRIVATE_KEY,
            { expiresIn: JWT_TOKEN_VALIDITY }
        )

        // return new user
        res.status(RES_CODES.STATUS_SUCCESS_CREATED).send({ user, token })
    } catch (err) {
        console.log(err)
    }
}


module.exports = { registerUser }