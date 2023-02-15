const jwt = require("jsonwebtoken");

const { JWT_SECRET_TOKEN_KEY } = process.env;


const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET_TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            return next();
        }
        else {
            return res.status(403).json("You are not alowed to do that!");
        }
    });
};


const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            return next();
        }
        else {
            return res.status(403).json("You are not alowed to do that!");
        }
    });
};


module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };