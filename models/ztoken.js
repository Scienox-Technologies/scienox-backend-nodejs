// import modules
const mongoose = require("mongoose");


// Token schema
const TokenSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        refreshToken: {
            type: String,
            required: true
        },
        expiresIn: {
            type: Date,
            required: true
        },
        createdByIp: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);


// export Token schema
module.exports = mongoose.model("Token", TokenSchema);