require("dotenv").config();
const bcrypt = require("bcrypt");

const Admin = require("../../models/Admin")
const Student = require("../../models/Student")
const Instructor = require("../../models/Instructor")

const RES_CODES = require("../../constants/resCodes.js")


const createUser = async (req, res) => {
    try {
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

        // return new user
        res.status(RES_CODES.STATUS_SUCCESS_CREATED).send(user)
    } catch (err) {
        console.log(err)
    }
}


module.exports = { createUser }


/*
{
    "first_name": "admin",
    "last_name": "user",
    "email": "admin@mail.com",
    "password": "adminuser",
    "user_type": "admin"
}
*/