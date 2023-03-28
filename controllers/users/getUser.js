require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Admin = require("../../models/Admin")
const Student = require("../../models/Student")
const Instructor = require("../../models/Instructor")

const RES_CODES = require("../../constants/resCodes.js")

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
const JWT_TOKEN_VALIDITY = process.env.JWT_TOKEN_VALIDITY


const getUser = async (req, res) => {
    try {
        const user = await Admin.findById(req.params.userId)
            || await Student.findById(req.params.userId)
            || await Instructor.findById(req.params.userId)

        if (!user) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No user with given id", ERR: RES_CODES.ERR_INVALID_USER_ID });
        }

        const { password, ...others } = user._doc;
        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(others);
    } catch (err) {
        console.log(err);
    }
}


module.exports = { getUser }