// database models
const Lecture = require("../../models/Lecture")

// response codes
const RES_CODES = require("../../constants/resCodes.js")


// get all lectures function
const getLectures = async (req, res) => {
    try {
        // select required data from request url query
        const QUERIES = req.query

        // fetch all lectures without password
        const lectures = await Lecture.find(QUERIES)

        // check if no lectures are found
        const NO_LECTURES_FETCHED = lectures.length === 0
        if (NO_LECTURES_FETCHED) {
            // !!! ----- ----- ----- ----- -----
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No lectures found" })
        }

        // send all lectures data
        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(lectures)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = getLectures