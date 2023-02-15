const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            // select: false
        },
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other']
        },
        photoUrl: {
            type: String,
            default:
                'https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png'
        },
        language: {
            type: String,
            enum: ['en', 'hi', 'mr'],
            default: 'en'
        },
        // user is premium or not
        isPremium: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        // user completed email-verification or not
        isVerified: {
            type: Boolean,
            default: false
        },
        // in case user delete account
        devices: {
            type: Array,
        },
        // user account is active or deleted
        isActivated: {
            type: Boolean,
            default: true,
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