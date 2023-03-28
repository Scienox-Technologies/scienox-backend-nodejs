require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Admin = require("../../models/Admin")
const Student = require("../../models/Student")
const Instructor = require("../../models/Instructor")

const RES_CODES = require("../../constants/resCodes.js")

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
const JWT_TOKEN_VALIDITY = process.env.JWT_TOKEN_VALIDITY


const loginUser = async (req, res) => {
    try {
        // Get user input
        const {
            user_type,
            email,
            password
        } = req.body

        // Validate user input
        const IS_VALID_INPUT = email && password && user_type
        if (!IS_VALID_INPUT) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "All input is required", ERR: RES_CODES.ERR_INSUFFICIENT_REQ })
        }

        // Validate user type
        const IS_VALID_USER_TYPE = user_type === "student" || user_type === "instructor" || user_type === "admin"
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
        else if (user_type === "admin") {
            User = Admin
        }

        // Validate if user exists in database
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No user with given email, please register", ERR: RES_CODES.ERR_USER_DOES_NOT_EXISTS })
        }

        const IS_PASSWORD_CORRECT = await bcrypt.compare(password, user.password)
        if (IS_PASSWORD_CORRECT) {
            const user_type = user.user_type
            const user_id = user._id

            // Create token
            const token = jwt.sign(
                { user_id, email, user_type },
                JWT_PRIVATE_KEY,
                { expiresIn: JWT_TOKEN_VALIDITY }
            )

            return res.status(RES_CODES.STATUS_SUCCESS_OK).send({ user, token })
        }

        return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "Invalid Credentials", ERR: RES_CODES.ERR_INVALID_CREDENTIALS })
    } catch (err) {
        console.log(err)
    }
}


module.exports = { loginUser }