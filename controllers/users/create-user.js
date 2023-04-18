// packages
const bcrypt = require("bcrypt")

// database models
const Admin = require("../../models/Admin")
const Student = require("../../models/Student")
const Instructor = require("../../models/Instructor")

// response codes
const RES_CODES = require("../../constants/resCodes.js")


// create user function
const createUser = async (req, res) => {
    try {
        // select required data from request body
        const user_type = req.body.user_type
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const email = req.body.email
        const password = req.body.password

        // creator details
        const creator_id = req.user.user_id;
        const creator_type = req.user.user_type

        // create single object of user data
        const userData = req.body
        userData.creator_id = creator_id
        userData.creator_type = creator_type
        userData.email = email.toLowerCase()

        // validate request data
        const IS_VALID_INPUT = email && password && first_name && last_name && user_type
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
        const USER = await User.findOne({ email: email }, { password: 0 })

        // check if user already exist
        const USER_EXISTS = USER !== null
        if (USER_EXISTS) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "User already exists", ERR: RES_CODES.ERR_USER_ALREADY_EXISTS })
        }

        // encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10)
        userData.password = encryptedPassword

        // create new user in database
        const newUser = await User.create(userData)

        // select creator model based on creator type
        var Creator
        if (creator_type === "admin") {
            Creator = Admin

            // update creator created users
            const userCreator = await Creator.findById(creator_id)

            // select created user array based on new user type
            if (user_type === "student") {
                userCreator.createdStudents_id.push(newUser._id)
            }
            else if (user_type === "instructor") {
                userCreator.createdInstructors_id.push(newUser._id)
            }
            else if (user_type === "admin") {
                userCreator.createdAdmins_id.push(newUser._id)
            }

            await userCreator.save()
        }

        // separate password from other user details
        const { password: _, ...user } = newUser._doc

        // send newly created user data
        res.status(RES_CODES.STATUS_SUCCESS_CREATED).send(user)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = createUser