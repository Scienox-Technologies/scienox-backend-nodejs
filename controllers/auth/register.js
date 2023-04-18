// packages
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// database models
const Student = require("../../models/Student")
const Instructor = require("../../models/Instructor")

// response codes
const RES_CODES = require("../../constants/resCodes.js")

// environment variables
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
const JWT_TOKEN_VALIDITY = process.env.JWT_TOKEN_VALIDITY


// user registration function
const registerUser = async (req, res) => {
    try {
        // select required data from request body
        const user_type = req.body.user_type
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const email = req.body.email
        const password = req.body.password

        // creator details
        const creator_type = "self"

        // create single object of course data
        const courseData = req.body
        courseData.creator_type = creator_type
        courseData.email = email.toLowerCase()

        // validate request data
        const IS_VALID_INPUT = email && password && first_name && last_name && user_type
        if (!IS_VALID_INPUT) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "All input is required", ERR: RES_CODES.ERR_INSUFFICIENT_REQ })
        }

        // validate user type
        const IS_VALID_USER_TYPE = user_type === "student" || user_type === "instructor"
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

        // fetch user without password
        const USER = await User.findOne({ email: email }, { password: 0 })

        // check if user already exist
        const USER_EXISTS = USER !== null
        if (USER_EXISTS) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "User already exists, please login", ERR: RES_CODES.ERR_USER_ALREADY_EXISTS })
        }

        // encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10)
        courseData.password = encryptedPassword

        // create user in database
        const newUser = await User.create(courseData)

        // create token
        const user_id = newUser._id
        const token = jwt.sign(
            { user_id, email, user_type },
            JWT_PRIVATE_KEY,
            { expiresIn: JWT_TOKEN_VALIDITY }
        )

        // separate password from other user details
        const { password: _, ...user } = newUser._doc

        // send newly created user data and token
        return res.status(RES_CODES.STATUS_SUCCESS_CREATED).send({ user, token })
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = registerUser