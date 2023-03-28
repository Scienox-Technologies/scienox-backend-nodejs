const router = require('express').Router()
const {
    registerUser,
    loginUser
} = require('../controllers/auth/index.js');


// Register
router.post('/register', registerUser);

// Login
router.post("/login", loginUser);


module.exports = router;