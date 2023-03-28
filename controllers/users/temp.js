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

const USER_TYPES = ["admin", "instructor", "student"]


export default async (req, res) => {
    try {
        const userType = req.params.userType.slice(0, req.params.userType.length - 1)
        const VALID_USER_TYPE = USER_TYPES.includes(userType)

        if (!VALID_USER_TYPE) {
            return res.status(409).send({ MSG: "Invalid user type in request URL", ERR: ERR_INVALID_USER_TYPE });
        }

        const users = await User.find({ userType }, { password: 0 })

        if (!users.length) {
            return res.status(409).send({ MSG: "No users found", ERR: ERR_NO_USERS_FOUND });
        }

        return res.status(201).send(users);
    } catch (err) {
        console.log(err);
    }
}