const mongoose = require("mongoose")


const FileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        lecture_id: {
            type: mongoose.Types.ObjectId,
            ref: "Lecture",
            required: true
        },
        storagepath: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        uploadedAt: {
            type: Date,
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


module.exports = mongoose.model("File", FileSchema)