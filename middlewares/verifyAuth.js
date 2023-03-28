const jwt = require("jsonwebtoken");

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const RES_CODES = require("../constants/resCodes.js")


const verifyToken = (req, res, next) => {
    const TOKEN =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!TOKEN) {
        return res.status(RES_CODES.STATUS_ERR_CLIENT_UNAUTHORISED).send({ MSG: "Token is required for authentication", ERR: RES_CODES.ERR_NO_TOKEN });
    }
    try {
        const decoded = jwt.verify(TOKEN, JWT_PRIVATE_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(RES_CODES.STATUS_ERR_CLIENT_UNAUTHORISED).send({ MSG: "Token is invalid", ERR: RES_CODES.ERR_INVALID_TOKEN });
    }
    return next();
};


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        const USER_IS_ADMIN = req.user.user_type === "admin"
        const USER_IS_SELF = req.user.id === req.params.id

        if (USER_IS_SELF || USER_IS_ADMIN) {
            return next();
        }
        else {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_USER });
        }
    });
};


const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        const USER_IS_ADMIN = req.user.user_type === "admin"

        if (USER_IS_ADMIN) {
            return next();
        }
        else {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_ADMIN });
        }
    });
};


const verifyTokenAndInstructor = (req, res, next) => {
    verifyToken(req, res, () => {
        const USER_IS_INSTRUCTOR = req.user.user_type === "instructor"

        if (USER_IS_INSTRUCTOR) {
            return next();
        }
        else {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_INSTRUCTOR });
        }
    });
};


const verifyTokenAndStudent = (req, res, next) => {
    verifyToken(req, res, () => {
        const USER_IS_STUDENT = req.user.user_type === "student"

        if (USER_IS_STUDENT) {
            return next();
        }
        else {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_STUDENT });
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