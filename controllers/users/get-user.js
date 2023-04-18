// database models
const Admin = require("../../models/Admin")
const Student = require("../../models/Student")
const Instructor = require("../../models/Instructor")

// response codes
const RES_CODES = require("../../constants/resCodes.js")


// get individual user function
const getUser = async (req, res) => {
    try {
        // select required data from request url parameters
        const user_type = req.params.userType
        const user_id = req.params.userId

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
        const user = await User.findOne({ _id: user_id }, { password: 0 })

        // check if user exists
        const USER_NOT_EXISTS = user === null
        if (USER_NOT_EXISTS) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No user with given id", ERR: RES_CODES.ERR_INVALID_USER_ID })
        }

        // send user data
        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(user)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = getUser