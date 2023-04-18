// database models
const Lecture = require("../../models/Lecture")

// response codes
const RES_CODES = require("../../constants/resCodes.js")


// update lecture function
const updateLecture = async (req, res) => {
    try {
        // select required data from request url parameters
        const lecture_id = req.params.lectureId

        // fetch lecture without password
        const LECTURE = await Lecture.findById(lecture_id)

        // check if lecture exists or is deleted
        const LECTURE_NOT_EXISTS = LECTURE === null
        const IS_LECTURE_DELETED = (LECTURE && LECTURE.isDeleted)
        if (LECTURE_NOT_EXISTS) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No lecture with given id", ERR: RES_CODES.ERR_INVALID_LECTURE_ID })
        }
        else if (IS_LECTURE_DELETED) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_CONFLICT).send({ MSG: "Lecture already deleted", ERR: RES_CODES.ERR_LECTURE_ALREADY_DELETED })
        }

        // update lecture
        const lecture = await Lecture.findByIdAndUpdate(
            lecture_id,
            { $set: req.body },
            { new: true }
        )

        // send updated lecture data
        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(lecture)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = updateLecture