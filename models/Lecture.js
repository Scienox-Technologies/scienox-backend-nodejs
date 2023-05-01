const mongoose = require("mongoose")


const LectureSchema = new mongoose.Schema(
    {
        lecture_topic: {
            type: String,
            required: true
        },
        course_id: {
            type: mongoose.Types.ObjectId,
            ref: "Course",
            required: true
        },
        // startDate: {
        //     type: Date,
        //     require: true
        // },
        // endDate: {
        //     type: Date,
        //     require: true
        // },
        // short_description: {
        //     type: String,
        //     required: true
        // },
        // long_description: {
        //     type: String,
        //     required: true
        // },
        // imgUrl: {
        //     type: String,
        //     default: 'https://bbst1.badabusiness.com/wp-content/uploads/2021/04/online-course-blog-header-784x441.jpg'
        // },
        // mode: {
        //     type: String,
        //     enum: ['online', 'offline', 'hybrid'],
        //     default: 'online'
        // },
        // venue: {
        //     type: String,
        //     required: true
        // },

        instructors_id: [{
            type: mongoose.Types.ObjectId,
            ref: "Instructor",
        }],

        files: [{
            type: mongoose.Types.ObjectId,
            ref: "File",
        }],




        // homework: {
        //     type: [HomeworkSchema]
        // },
        // notes: {
        //     type: [NoteSchema]
        // },
        // tests: {
        //     type: [TestSchema]
        // },

        // Downloads	0
        // Forum Topics	0

        // attended_std_id: [{
        //     type: mongoose.Types.ObjectId,
        //     ref: "Student",
        // }],

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


module.exports = mongoose.model("Lecture", LectureSchema)