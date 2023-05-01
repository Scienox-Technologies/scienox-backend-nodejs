// database models
const Course = require("../../models/Course")

// response codes
const RES_CODES = require("../../constants/resCodes.js")


// delete course function
const deleteCourse = async (req, res) => {
    try {
        // select required data from request url parameters
        const course_id = req.params.courseId

        // fetch course
        const COURSE = await Course.findById(course_id)

        // check if course exists or is deleted
        const COURSE_NOT_EXISTS = COURSE === null
        const IS_COURSE_DELETED = (COURSE && COURSE.isDeleted)
        if (COURSE_NOT_EXISTS) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No course with given id", ERR: RES_CODES.ERR_INVALID_COURSE_ID })
        }
        else if (IS_COURSE_DELETED) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_CONFLICT).send({ MSG: "Course already deleted", ERR: RES_CODES.ERR_COURSE_ALREADY_DELETED })
        }

        // mark course as deleted with deletedAt timestamp
        const course = await Course.findByIdAndUpdate(
            course_id,
            { isDeleted: true, deletedAt: Date.now() },
            { new: true }
        )

        // send newly created course data
        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(course)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = deleteCourse