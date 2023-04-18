// packages
const router = require('express').Router()

// user controllers
const getUsers = require('../controllers/users/get-users.js')
const getUser = require('../controllers/users/get-user.js')
const deleteUser = require('../controllers/users/delete-user.js')
const updateUser = require('../controllers/users/update-user.js')
const createUser = require('../controllers/users/create-user.js')

// middlewares
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyAuth.js")


// get all users with filters in url query
router.get("/get-users", verifyTokenAndAdmin, getUsers)

// get individual user
router.get("/get-user/:userType/:userId", verifyTokenAndAuthorization, getUser)

// delete User
router.delete("/delete-user/:userType/:userId", verifyTokenAndAuthorization, deleteUser)

// update User
router.put("/update-user/:userType/:userId", verifyTokenAndAuthorization, updateUser)

// create User
router.post("/create-user", verifyTokenAndAdmin, createUser)


// export router
module.exports = router