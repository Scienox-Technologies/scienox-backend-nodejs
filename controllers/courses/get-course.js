// database models
const Course = require("../../models/Course")

// response codes
const RES_CODES = require("../../constants/resCodes.js")


// get individual course function
const getCourse = async (req, res) => {
    try {
        // select required data from request url parameters
        const course_id = req.params.courseId

        // fetch course
        const course = await Course.findById(course_id)
        // check if course exists
        const COURSE_NOT_EXISTS = course === null
        if (COURSE_NOT_EXISTS) {
            // !!! ----- ----- ----- ----- -----
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No course with given id"})
        }

        // send course data
        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(course)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = getCourse