require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Admin = require("../../models/Admin")
const Student = require("../../models/Student")
const Instructor = require("../../models/Instructor")

const RES_CODES = require("../../constants/resCodes.js")

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
const JWT_TOKEN_VALIDITY = process.env.JWT_TOKEN_VALIDITY


const getUsers = async (req, res) => {
    try {
        // Get user input
        const QUERIES = req.query

        // Get all users
        const admins = await Admin.find(QUERIES, { password: 0 })
        const students = await Student.find(QUERIES, { password: 0 })
        const instructors = await Instructor.find(QUERIES, { password: 0 })

        const users = [...admins, ...students, ...instructors]

        if (!users.length) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No users found", ERR: RES_CODES.ERR_USERS_NOT_FOUND });
        }

        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(users)
    } catch (err) {
        console.log(err)
    }
}


module.exports = { getUsers }