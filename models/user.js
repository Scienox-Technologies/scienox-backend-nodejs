const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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
            unique: true
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
        gender: {
            type: String,
            enum: ['male', 'female', 'other']
        },
        userType: {
            type: String,
            enum: ['admin', 'instructor', 'student'],
            default: "student"
        },
        language: {
            type: String,
            enum: ['en', 'hi', 'mr'],
            default: 'en'
        },
        college: {
        type: String,
        },
        isPremium: {
            type: Boolean,
            default: false
        },
        // user completed email verification or not
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        // user completed mobile verification or not
        isMobileVerified: {
            type: Boolean,
            default: false
        },
        devices: {
            type: Array,
        },
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


module.exports = mongoose.model("User", UserSchema);