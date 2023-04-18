// packages
const router = require('express').Router()

// user controllers
const register = require('../controllers/auth/register.js')
const login = require('../controllers/auth/login.js')


// register
router.post('/register', register)

// login
router.post("/login", login)


// export router
module.exports = router