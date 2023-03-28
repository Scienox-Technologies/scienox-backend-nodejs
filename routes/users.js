const router = require('express').Router()
const {
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    createUser
} = require('../controllers/users/index.js');

const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyAuth.js");


// Get all users
router.get("/", verifyTokenAndAdmin, getUsers);

// // Get Individual User
// router.get("/:id", verifyTokenAndAdmin, getUser);

// // Delete User
// router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

// // Update User
// router.put("/:id", verifyTokenAndAuthorization, updateUser);

// Create User
router.post("/", verifyTokenAndAdmin, createUser);


module.exports = router;