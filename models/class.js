const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        Date: {
            type: Date,
            require: true
        },
        startTime: {
            type: Date,
            require: true
        },
        endTime: {
            type: Date,
            require: true
        },
        topics_covered: {
            type: String,
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
        // course account is active or deleted
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


module.exports = mongoose.model("Class", ClassSchema);