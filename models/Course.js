const mongoose = require("mongoose")


const CourseSchema = new mongoose.Schema(
    {
        course_name: {
            type: String,
            required: true
        },
        // enrollmentCloseDate: {
        //     type: Date,
        //     require: true
        // },
        startDate: {
            type: Date,
            require: true
        },
        // endDate: {
        //     type: Date,
        //     require: true
        // },
        short_description: {
            type: String,
            required: true
        },
        // long_description: {
        //     type: String,
        //     required: true
        // },
        // fee: {
        //     type: Number,
        //     required: true,
        //     default: 0
        // },
        // student_capacity: {
        //     type: Number,
        //     required: true
        // },
        // imgUrl: {
        //     type: String,
        //     default: 'https://bbst1.badabusiness.com/wp-content/uploads/2021/04/online-course-blog-header-784x441.jpg'
        // },
        mode: {
            type: String,
            enum: ['online', 'offline', 'hybrid'],
            default: 'online'
        },
        // venue: {
        //     type: String,
        //     required: true
        // },
        categories: {
            type: Array,
            // required: true
        },
        lectures_id: [{
            type: mongoose.Types.ObjectId,
            ref: "Lecture",
        }],
        instructors_id: [{
            type: mongoose.Types.ObjectId,
            ref: "Instructor",
        }],
        enrolledStudents: [{
            enrolledStudent_id: {
                type: mongoose.Types.ObjectId,
                ref: "Student",
            },
            enrolledAt: {
                type: Date,
                required: true
            },
            _id : false
        }],

        // isChatEnabled: {
        //     type: Boolean,
        //     default: false,
        // },
        // isDiscussionEnabled: {
        //     type: Boolean,
        //     default: false,
        // },
        // isStudentForumEnabled: {
        //     type: Boolean,
        //     default: false,
        // },

        creator_id: {
            type: mongoose.Types.ObjectId
        },
        creator_type: {
            type: String,
            enum: ['admin', 'instructor'],
            required: true
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model("Course", CourseSchema)