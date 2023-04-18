// database models
const Course = require("../../models/Course")
const Student = require("../../models/Student")

// response codes
const RES_CODES = require("../../constants/resCodes.js")


// enroll course function
const enrollCourse = async (req, res) => {
    try {
        // set student_id
        var student_id
        if (req.user.user_type === "student") {
            student_id = req.user.user_id;
        }
        else if (req.user.user_type === "admin") {
            student_id = req.body.student_id
        }

        // select required data from request url parameters
        const course_id = req.params.courseId

        // fetch course
        const course = await Course.findById(course_id)

        // check if course exists or is deleted
        const COURSE_NOT_EXISTS = course === null
        const IS_COURSE_DELETED = (course && course.isDeleted)
        if (COURSE_NOT_EXISTS) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No course with given id", ERR: RES_CODES.ERR_INVALID_COURSE_ID })
        }
        else if (IS_COURSE_DELETED) {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_CONFLICT).send({ MSG: "Course already deleted", ERR: RES_CODES.ERR_COURSE_ALREADY_DELETED })
        }

        // fetch student
        const student = await Student.findById(student_id)

        // check if student exists or is deleted
        const STUDENT_NOT_EXISTS = student === null
        const IS_STUDENT_DELETED = (student && student.isDeleted)
        if (STUDENT_NOT_EXISTS) {
            // !!! ----- ----- ----- ----- -----
            return res.status(RES_CODES.STATUS_ERR_CLIENT_NOT_FOUND).send({ MSG: "No student with given id", ERR: RES_CODES.ERR_INVALID_STUDENT_ID })
        }
        else if (IS_STUDENT_DELETED) {
            // !!! ----- ----- ----- ----- -----
            return res.status(RES_CODES.STATUS_ERR_CLIENT_CONFLICT).send({ MSG: "Student already deleted", ERR: RES_CODES.ERR_STUDENT_ALREADY_DELETED })
        }

        // check if student is already enrolled
        student.enrolledCourses.forEach((courseObj) => {
            if (courseObj.enrolledCourse_id == course_id) {
            // !!! ----- ----- ----- ----- -----
                return res.status(RES_CODES.STATUS_ERR_CLIENT_CONFLICT).send({ MSG: "Student already enrolled to given course", ERR: RES_CODES.ERR_ALREADY_ENROLLED })
            }
        })

        // enrollment time
        const enrolledAt = Date.now()

        // update course enrolled students
        course.enrolledStudents.push({
            enrolledStudent_id: student_id,
            enrolledAt: Date.now()
        })
        await course.save()

        // update student enrolled courses 
        student.enrolledCourses.push({
            enrolledCourse_id: course_id,
            enrolledAt: Date.now()
        })
        await student.save()

        // send updated course data
        return res.status(RES_CODES.STATUS_SUCCESS_OK).send({ course, student })
    } catch (err) {
        console.log(err)
    }
}


// export function
module.exports = enrollCourse