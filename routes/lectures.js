// packages
const router = require('express').Router()

// lecture controllers
const getLectures = require('../controllers/lectures/get-lectures.js')
const getLecture = require('../controllers/lectures/get-lecture.js')
const deleteLecture = require('../controllers/lectures/delete-lecture.js')
const updateLecture = require('../controllers/lectures/update-lecture.js')
const createLecture = require('../controllers/lectures/create-lecture.js')
const uploadFile = require('../controllers/lectures/upload-file.js')

// middlewares
const {
    verifyTokenAndAdmin,
    verifyTokenAndInstructor,
    verifyTokenAndLectureInstructor
} = require("../middlewares/verifyAuth.js")


const documentUpload = require("../middlewares/document-upload.js")


// get all users with filters in url query
router.get("/get-lectures", verifyTokenAndAdmin, getLectures)

// get individual user
router.get("/get-lecture/:lectureId", verifyTokenAndLectureInstructor, getLecture)

// delete User
router.delete("/delete-lecture/:lectureId", verifyTokenAndLectureInstructor, deleteLecture)

// update User
router.put("/update-lecture/:lectureId", verifyTokenAndLectureInstructor, updateLecture)

// create lecture
router.post("/create-lecture", verifyTokenAndInstructor, createLecture)

// upload file
router.get("/upload-lecture-file", (req, res)=>{
    res.render("uploadFile.ejs")
})
// router.post("/upload-lecture-file", verifyTokenAndInstructor, uploadFile)
// router.post("/upload-lecture-file", documentUpload, uploadFile)


// export router
module.exports = router