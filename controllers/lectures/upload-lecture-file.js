// database models
const Admin = require("../../models/Admin")
const Instructor = require("../../models/Instructor")
const Lecture = require("../../models/Lecture")
const File = require("../../models/File")

// response codes
const RES_CODES = require("../../constants/resCodes.js")


// upload lecture file function
const uploadLectureFile = async (req, res) => {
    try {

        console.log(req.file)
        console.log(req.file.filename)


        // select required data from request url parameters
        const lecture_id = req.params.lectureId

        // creator details
        const creator_id = req.user.user_id;
        const creator_type = req.user.user_type

        // create single object of file data
        fileData = req.body
        fileData.creator_id = creator_id
        fileData.creator_type = creator_type
        fileData.lecture_id = lecture_id
        fileData.filename = req.body.filename
        fileData.storagepath = req.file.destination
        fileData.size = req.file.size
        fileData.encoding = req.file.encoding
        fileData.mimetype = req.file.mimetype
        fileData.description = req.body.description
        fileData.uploadedAt = Date.now()

        // fetch lecture
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

        // create new file in database
        const newFile = await File.create(fileData)

        // select creator model based on creator type
        var Creator
        if (creator_type === "admin") {
            Creator = Admin
        }
        else if (creator_type === "instructor") {
            Creator = Instructor
        }

        // update creator created lectures
        const fileCreator = await Creator.findById(creator_id)
        fileCreator.createdLectures_id.push(newFile._id)
        await fileCreator.save()

        // update creator created lectures
        const lecture = await Lecture.findById(lecture_id)
        lecture.files.push(newFile._id)
        await lecture.save()

        // send updated lecture data
        return res.status(RES_CODES.STATUS_SUCCESS_OK).send(newFile)
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = uploadLectureFile