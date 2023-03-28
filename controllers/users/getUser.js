require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const ERR_INVALID_USER_TYPE = "ERR_INVALID_USER_TYPE"
const ERR_NO_USERS_FOUND = "ERR_NO_USERS_FOUND"
const ERR_INVALID_USER_ID = "ERR_INVALID_USER_ID"
const ERR_USER_ALREADY_DELETED = "ERR_USER_ALREADY_DELETED"
const ERR_USER_ALREADY_EXISTS = "ERR_USER_ALREADY_EXISTS"


export default async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(409).send({ MSG: "No user with given id", ERR: ERR_INVALID_USER_ID });
        }

        const { password, ...others } = user._doc;
        return res.status(201).send(others);
    } catch (err) {
        console.log(err);
    }
}