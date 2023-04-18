// database models
const Admin = require("../../models/Admin")
const Student = require("../../models/Student")
const Instructor = require("../../models/Instructor")

// response codes
const RES_CODES = require("../../constants/resCodes.js")


// get all users function
const getUsers = async (req, res) => {
    try {
        // select required data from request url query
        const QUERIES = req.query

        // fetch all users without password
        const admins = await Admin.find(QUERIES, { password: 0 })
        const students = await Student.find(QUERIES, { password: 0 })
        const instructors = await Instructor.find(QUERIES, { password: 0 })

        // add users in single array
        const users = [...admins, ...students, ...instructors]

        // check if no users are found
        const NO_USERS_FETCHED = users.length === 0
        if (NO_USERS_FETCHED) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No users found", ERR: RES_CODES.ERR_USERS_NOT_FOUND })
        }

        // send all users data
        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(users)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = getUsers