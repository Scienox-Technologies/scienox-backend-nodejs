// database models
const Lecture = require("../../models/Lecture")
const Course = require("../../models/Course")
const Instructor = require("../../models/Instructor")
const Admin = require("../../models/Admin");

// response codes
const RES_CODES = require("../../constants/resCodes.js");


// create lecture function
const createLecture = async (req, res) => {
    try {
        // select required data from request body
        const course_id = req.body.course_id

        // creator details
        const creator_id = req.user.user_id;
        const creator_type = req.user.user_type

        // instructor details
        const instructor_id = req.body.instructor_id || req.user.user_id;

        // create single object of lecture data
        const lectureData = req.body
        lectureData.creator_id = creator_id
        lectureData.creator_type = creator_type
        lectureData.instructors_id = [instructor_id]

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

        // fetch course
        const course = await Course.findById(course_id)

        // check if course exists or is deleted
        const COURSE_NOT_EXISTS = course === null
        const IS_COURSE_DELETED = (course && course.isDeleted)
        if (COURSE_NOT_EXISTS) {
            // !!! ----- ----- ----- ----- -----
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No course with given id", ERR: RES_CODES.ERR_INVALID_USER_ID })
        }
        else if (IS_COURSE_DELETED) {
            // !!! ----- ----- ----- ----- -----
            return res.status(RES_CODES.STATUS_ERR_CLIENT_CONFLICT).send({ MSG: "Course already deleted", ERR: RES_CODES.ERR_USER_ALREADY_DELETED })
        }

        // validate request data
        // !!! ----- ----- ----- ----- -----
        const IS_VALID_INPUT = true
        if (!IS_VALID_INPUT) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_BAD_REQUEST).send({ MSG: "All input is required" })
        }

        // create new lecture in database
        const newLecture = await Lecture.create(lectureData)

        // select creator model based on creator type
        var Creator
        if (creator_type === "admin") {
            Creator = Admin
        }
        else if (creator_type === "instructor") {
            Creator = Instructor
        }

        // update creator created lectures
        const lectureCreator = await Creator.findById(creator_id)
        lectureCreator.createdLectures_id.push(newLecture._id)
        await lectureCreator.save()

        // update course lectures array
        course.lectures_id.push(newLecture._id)
        await course.save()

        // send newly created lecture data
        res.status(RES_CODES.STATUS_SUCCESS_CREATED).send(newLecture)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = createLecture