const mongoose = require("mongoose")


const ClassSchema = require("../models/class")
const HomeworkSchema = require("../models/homework")
const NoteSchema = require("../models/note")
const TestSchema = require("../models/test")
const FileSchema = require("../models/file")


const CourseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        instructors_id: [{
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
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
        cost: {
            type: Number,
            required: true,
            default: 0
        },
        capacity: {
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
        // classes: {
        //     type: [ClassSchema]
        // },
        // homework: {
        //     type: [HomeworkSchema]
        // },
        // notes: {
        //     type: [NoteSchema]
        // },
        // tests: {
        //     type: [TestSchema]
        // },
        // files: {
        //     type: [FileSchema]
        // },
        // Downloads	0
        // Forum Topics	0

        enrolled_std_id: {
            type: [String]
        },
        // attended_std_id: {
        //     type: [String]
        // },
        // isChatEnabled: {
        //     type: Boolean,
        //     default: false,
        // },
        // isDiscussionEnabled: {
        //     type: Boolean,
        //     default: false,
        // },
        // isOrderEnforced: {
        //     type: Boolean,
        //     default: false,
        // },
        // isStudentForumEnabled: {
        //     type: Boolean,
        //     default: false,
        // },

        // isPremium: {
        //     type: Boolean,
        //     default: false
        // },

        // course is deleted
        isDeleted: {
            type: Boolean,
            default: false,
        },
        // in case course deleted
        deletedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Course", CourseSchema);