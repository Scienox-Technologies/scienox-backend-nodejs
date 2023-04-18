// packages
const router = require('express').Router()

// course controllers
const getCourses = require('../controllers/courses/get-courses.js')
const getCourse = require('../controllers/courses/get-course.js')
const deleteCourse = require('../controllers/courses/delete-course.js')
const updateCourse = require('../controllers/courses/update-course.js')
const createCourse = require('../controllers/courses/create-course.js')
const enrollCourse = require('../controllers/courses/enroll-course.js')
const unenrollCourse = require('../controllers/courses/unenroll-course.js')

// middlewares
const {
    verifyTokenAndAdmin,
    verifyTokenAndInstructor,
    verifyTokenAndCourseInstructor,
    verifyTokenAndStudent
} = require("../middlewares/verifyAuth.js")


// get all users with filters in url query
router.get("/get-courses", verifyTokenAndAdmin, getCourses)

// get individual user
router.get("/get-course/:courseId", verifyTokenAndCourseInstructor, getCourse)

// // delete User
router.delete("/delete-course/:courseId", verifyTokenAndCourseInstructor, deleteCourse)

// update User
router.put("/update-course/:courseId", verifyTokenAndCourseInstructor, updateCourse)

// create course
router.post("/create-course", verifyTokenAndInstructor, createCourse)

// enroll course
router.post("/enroll-course/:courseId", verifyTokenAndStudent, enrollCourse)

// unenroll course
router.post("/unenroll-course/:courseId", verifyTokenAndStudent, unenrollCourse)


// export router
module.exports = router