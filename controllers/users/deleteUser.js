require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Admin = require("../../models/Admin")
const Student = require("../../models/Student")
const Instructor = require("../../models/Instructor")

const RES_CODES = require("../../constants/resCodes.js")

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
const JWT_TOKEN_VALIDITY = process.env.JWT_TOKEN_VALIDITY


const deleteUser = async (req, res) => {
    try {
        const user = await Admin.findById(req.params.userId)
            || await Student.findById(req.params.userId)
            || await Instructor.findById(req.params.userId)

        const NO_USER = !user
        const IS_USER_DELETED = (user && user.isDeleted)

        if (NO_USER) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No user with given id", ERR: RES_CODES.ERR_INVALID_USER_ID });
        }
        else if (IS_USER_DELETED) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_CONFLICT).send({ MSG: "User already deleted", ERR: RES_CODES.ERR_USER_ALREADY_DELETED });
        }

        const user_type = user.user_type

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

        const deletedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { isDeleted: true, deletedAt: Date.now() },
            { new: true }
        )

        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(deletedUser);
    } catch (err) {
        console.log(err);
    }
}


module.exports = { deleteUser }