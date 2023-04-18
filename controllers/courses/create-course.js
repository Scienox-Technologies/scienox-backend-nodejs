// database models
const Course = require("../../models/Course")
const Instructor = require("../../models/Instructor")
const Admin = require("../../models/Admin");

// response codes
const RES_CODES = require("../../constants/resCodes.js");


// create course function
const createCourse = async (req, res) => {
    try {
        // select required data from request body
        const course_name = req.body.course_name

        // creator details
        const creator_id = req.user.user_id;
        const creator_type = req.user.user_type

        // instructor details
        const instructor_id = req.body.instructor_id || req.user.user_id;

        // create single object of course data
        const courseData = req.body
        courseData.creator_id = creator_id
        courseData.creator_type = creator_type
        courseData.instructors_id = [instructor_id]

        // fetch instructor
        const instructor = await Instructor.findById(instructor_id)

        // check if instructor exists or is deleted
        const INSTRUCTOR_NOT_EXISTS = instructor === null
        const IS_INSTRUCTOR_DELETED = (instructor && instructor.isDeleted)
        if (INSTRUCTOR_NOT_EXISTS) {
            // !!! ----- ----- ----- ----- -----
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No instructor with given id", ERR: RES_CODES.ERR_INVALID_USER_ID })
        }
        else if (IS_INSTRUCTOR_DELETED) {
            // !!! ----- ----- ----- ----- -----
            return res.status(RES_CODES.STATUS_ERR_CLIENT_CONFLICT).send({ MSG: "Instructor already deleted", ERR: RES_CODES.ERR_USER_ALREADY_DELETED })
        }

        // validate request data
        // !!! ----- ----- ----- ----- -----
        const IS_VALID_INPUT = true
        if (!IS_VALID_INPUT) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "All input is required" })
        }

        // create new course in database
        const newCourse = await Course.create(courseData)

        // update intructor teaching courses
        instructor.teachingCourses_id.push(newCourse._id)
        await instructor.save()

        // select creator model based on creator type
        var Creator
        if (creator_type === "admin") {
            Creator = Admin
        }
        else if (creator_type === "instructor") {
            Creator = Instructor
        }

        // update creator created courses
        const courseCreator = await Creator.findById(creator_id)
        courseCreator.createdCourses_id.push(newCourse._id)
        await courseCreator.save()

        // send newly created course data
        res.status(RES_CODES.STATUS_SUCCESS_CREATED).send(newCourse)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = createCourse