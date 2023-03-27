const jwt = require("jsonwebtoken");

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;


const ERR_NO_TOKEN = "ERR_NO_TOKEN"
const ERR_INVALID_TOKEN = "ERR_INVALID_TOKEN"
const ERR_UNAUTHORISED_USER = "ERR_UNAUTHORISED_USER"
const ERR_UNAUTHORISED_ADMIN = "ERR_UNAUTHORISED_ADMIN"
const ERR_UNAUTHORISED_INSTRUCTOR = "ERR_UNAUTHORISED_INSTRUCTOR"
const ERR_UNAUTHORISED_STUDENT = "ERR_UNAUTHORISED_STUDENT"


const verifyToken = (req, res, next) => {
    const TOKEN =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!TOKEN) {
        return res.status(403).send({ MSG: "Token is required for authentication", ERR: ERR_NO_TOKEN });
    }
    try {
        const decoded = jwt.verify(TOKEN, JWT_PRIVATE_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({ MSG: "Token is invalid", ERR: ERR_INVALID_TOKEN });
    }
    return next();
};


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        // const USER_IS_ADMIN = req.user.userType === "admin" ? true : false
        const USER_IS_ADMIN = req.user.userType === "admin"
        // const USER_IS_SELF = req.user.id === req.params.id ? true : false
        const USER_IS_SELF = req.user.id === req.params.id

        if (USER_IS_SELF || USER_IS_ADMIN) {
            return next();
        }
        else {
            return res.status(403).send({ MSG: "Not allowed", ERR: ERR_UNAUTHORISED_USER });
        }
    });
};


const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // const USER_IS_ADMIN = req.user.userType === "admin" ? true : false
        const USER_IS_ADMIN = req.user.userType === "admin"

        if (USER_IS_ADMIN) {
            return next();
        }
        else {
            return res.status(403).send({ MSG: "Not allowed", ERR: ERR_UNAUTHORISED_ADMIN });
        }
    });
};


const verifyTokenAndInstructor = (req, res, next) => {
    verifyToken(req, res, () => {
        const USER_IS_INSTRUCTOR = req.user.userType === "instructor" ? true : false

        if (USER_IS_INSTRUCTOR) {
            return next();
        }
        else {
            return res.status(403).send({ MSG: "Not allowed", ERR: ERR_UNAUTHORISED_INSTRUCTOR });
        }
    });
};


const verifyTokenAndStudent = (req, res, next) => {
    verifyToken(req, res, () => {
        const USER_IS_STUDENT = req.user.userType === "student" ? true : false

        if (USER_IS_STUDENT) {
            return next();
        }
        else {
            return res.status(403).send({ MSG: "Not allowed", ERR: ERR_UNAUTHORISED_STUDENT });
        }
    });
};


module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndInstructor,
    verifyTokenAndStudent
};