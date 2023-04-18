// database models
const Lecture = require("../../models/Lecture")

// response codes
const RES_CODES = require("../../constants/resCodes.js")


// get individual lecture function
const getLecture = async (req, res) => {
    try {
        // select required data from request url parameters
        const lecture_id = req.params.lectureId

        // fetch lecture without password
        const lecture = await Lecture.findById(lecture_id)
        // check if lecture exists
        const LECTURE_NOT_EXISTS = lecture === null
        if (LECTURE_NOT_EXISTS) {
            // !!! ----- ----- ----- ----- -----
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No lecture with given id"})
        }

        // send lecture data
        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(lecture)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = getLecture