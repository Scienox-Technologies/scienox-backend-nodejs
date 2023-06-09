const mongoose = require("mongoose")


const AdminSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        // mobile: {
        //     type: String,
        //     unique: true
        // },
        password: {
            type: String,
            required: true
        },
        photoUrl: {
            type: String,
            default: 'https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png'
        },
        // gender: {
        //     type: String,
        //     enum: ['male', 'female', 'other']
        // },
        user_type: {
            type: String,
            enum: ['admin', 'instructor', 'student'],
            default: "admin",
            required: true
        },
        // language: {
        //     type: String,
        //     enum: ['en', 'hi', 'mr'],
        //     default: 'en'
        // },

        // user completed email verification or not
        // isEmailVerified: {
        //     type: Boolean,
        //     default: false
        // },
        // emailVerifiedAt: {
        //     type: Date,
        // },

        // user completed mobile verification or not
        // isMobileVerified: {
        //     type: Boolean,
        //     default: false
        // },
        // mobileVerifiedAt: {
        //     type: Date,
        // },

        // devices: {
        //     type: Array,
        // },

        createdCourses_id: [{
            type: mongoose.Types.ObjectId,
            ref: "Course",
        }],
        createdLectures_id: [{
            type: mongoose.Types.ObjectId,
            ref: "Lecture",
        }],
        createdFiles_id: [{
            type: mongoose.Types.ObjectId,
            ref: "File",
        }],

        createdStudents_id: [{
            type: mongoose.Types.ObjectId,
            ref: "Student",
        }],
        createdInstructors_id: [{
            type: mongoose.Types.ObjectId,
            ref: "Instructor"
        }],
        createdAdmins_id: [{
            type: mongoose.Types.ObjectId,
            ref: "Instructor"
        }],

        creator_id: {
            type: mongoose.Types.ObjectId
        },
        creator_type: {
            type: String,
            default: "admin"
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


module.exports = mongoose.model("Admin", AdminSchema)