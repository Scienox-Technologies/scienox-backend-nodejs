// packages
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// database models
const Admin = require("../../models/Admin")
const Student = require("../../models/Student")
const Instructor = require("../../models/Instructor")

// response codes
const RES_CODES = require("../../constants/resCodes.js")

// environment variables
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
const JWT_TOKEN_VALIDITY = process.env.JWT_TOKEN_VALIDITY


// user login function
const loginUser = async (req, res) => {
    try {
        // select required data from request body
        const {
            user_type,
            email,
            password
        } = req.body

        // validate request data
        const IS_VALID_INPUT = email && password && user_type
        if (!IS_VALID_INPUT) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "All input is required", ERR: RES_CODES.ERR_INSUFFICIENT_REQ })
        }

        // validate user type
        const IS_VALID_USER_TYPE = user_type === "student" || user_type === "instructor" || user_type === "admin"
        if (!IS_VALID_USER_TYPE) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "Invalid user type", ERR: RES_CODES.ERR_INVALID_USER_TYPE })
        }

        // select database based on user type
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

        // fetch user without password
        const USER = await User.findOne({ email: email })

        // check if user exists or is deleted
        const USER_NOT_EXISTS = USER === null
        const IS_USER_DELETED = (USER && USER.isDeleted)
        if (USER_NOT_EXISTS) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No user with given id", ERR: RES_CODES.ERR_INVALID_USER_ID })
        }
        else if (IS_USER_DELETED) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_CONFLICT).send({ MSG: "User already deleted", ERR: RES_CODES.ERR_USER_ALREADY_DELETED })
        }

        // check if password is correct
        const IS_PASSWORD_CORRECT = await bcrypt.compare(password, USER.password)
        if (IS_PASSWORD_CORRECT) {
            // create token
            const user_type = USER.user_type
            const user_id = USER._id
            const token = jwt.sign(
                { user_id, email, user_type },
                JWT_PRIVATE_KEY,
                { expiresIn: JWT_TOKEN_VALIDITY }
            )

            // separate password from other user details
            const { password: _, ...user } = USER._doc

            // send user data and token
            return res.status(RES_CODES.STATUS_SUCCESS_OK).send({ user, token })
        }

        return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "Invalid Credentials", ERR: RES_CODES.ERR_INVALID_CREDENTIALS })
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = loginUser