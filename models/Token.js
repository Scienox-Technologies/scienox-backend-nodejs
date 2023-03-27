// import modules
const mongoose = require("mongoose");


// Token schema
const TokenSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
            unique: true,
        },
        token: {
            type: String,
            required: true
        },
        createdByIP: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        expiryAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);


// export Token schema
module.exports = mongoose.model("Token", TokenSchema);
