// database models
const Admin = require("../../models/Admin")
const Student = require("../../models/Student")
const Instructor = require("../../models/Instructor")

// response codes
const RES_CODES = require("../../constants/resCodes.js")


// delete user function
const deleteUser = async (req, res) => {
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
        const USER = await User.findOne({ _id: user_id }, { password: 0 })

        // check if user exists or is deleted
        const USER_NOT_EXISTS = USER === null
        const IS_USER_DELETED = (USER && USER.isDeleted)
        if (USER_NOT_EXISTS) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No user with given id", ERR: RES_CODES.ERR_INVALID_USER_ID })
        }
        else if (IS_USER_DELETED) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_CONFLICT).send({ MSG: "User already deleted", ERR: RES_CODES.ERR_USER_ALREADY_DELETED })
        }

        // mark user as deleted with deletedAt timestamp
        const deletedUser = await User.findByIdAndUpdate(
            user_id,
            { isDeleted: true, deletedAt: Date.now() },
            { new: true }
        )

        // separate password from other user details
        const { password: _, ...user } = deletedUser._doc

        // send newly created user data
        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(user)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = deleteUser