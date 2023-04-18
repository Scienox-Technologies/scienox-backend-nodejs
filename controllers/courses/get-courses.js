// database models
const Course = require("../../models/Course")

// response codes
const RES_CODES = require("../../constants/resCodes.js")


// get all courses function
const getCourses = async (req, res) => {
    try {
        // select required data from request url query
        const QUERIES = req.query

        // fetch all courses without password
        const courses = await Course.find(QUERIES)

        // check if no courses are found
        const NO_COURSES_FETCHED = courses.length === 0
        if (NO_COURSES_FETCHED) {
            // !!! ----- ----- ----- ----- -----
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No courses found" })
        }

        // send all courses data
        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(courses)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = getCourses