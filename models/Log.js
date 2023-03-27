const mongoose = require("mongoose");


const LogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId
        },
        resultCode: {
            type: String,
            required: true
        },
        errorMessage: {
            type: String,
            required: true
        },
        ip: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model("Log", LogSchema);