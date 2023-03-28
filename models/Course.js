const mongoose = require("mongoose")


const CourseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        instructors_id: [{
            type: mongoose.Types.ObjectId,
            ref: "Instructor",
        }],
        enrollmentCloseDate: {
            type: Date,
            require: true
        },
        startDate: {
            type: Date,
            require: true
        },
        endDate: {
            type: Date,
            require: true
        },
        short_description: {
            type: String,
            required: true
        },
        long_description: {
            type: String,
            required: true
        },
        fee: {
            type: Number,
            required: true,
            default: 0
        },
        student_capacity: {
            type: Number,
            required: true
        },
        imgUrl: {
            type: String,
            default: 'https://bbst1.badabusiness.com/wp-content/uploads/2021/04/online-course-blog-header-784x441.jpg'
        },
        mode: {
            type: String,
            enum: ['online', 'offline', 'hybrid'],
            default: 'online'
        },
        venue: {
            type: String,
            required: true
        },
        categories: {
            type: Array,
            required: true
        },
        classes_id: [{
            type: mongoose.Types.ObjectId,
            ref: "Class",
        }],
        enrolled_std_id: [{
            type: mongoose.Types.ObjectId,
            ref: "Student",
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
);


module.exports = mongoose.model("Course", CourseSchema);