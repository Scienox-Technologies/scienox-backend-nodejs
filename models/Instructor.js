const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema(
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
            unique: true,
            lowercase: true,
        },
        mobile: {
            type: String,
            // unique: true
        },
        password: {
            type: String,
            required: true,
            // select: false
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
            default: "instructor",
            required: true
        },
        // language: {
        //     type: String,
        //     enum: ['en', 'hi', 'mr'],
        //     default: 'en'
        // },

        createdCourses_id: [{
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        }],

        // isPremium: {
        //     type: Boolean,
        //     default: false
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

        // devices: {
        //     type: Array,
        // },

        // user account is active or deleted
        isDeleted: {
            type: Boolean,
            default: false,
        },
        // in case user delete account
        deletedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Instructor", InstructorSchema);