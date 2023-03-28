const { registerUser } = require('./registerUser.js')
const { loginUser } = require('./loginUser.js');


module.exports = {
    registerUser,
    loginUser
}


/*
import {
    changePassword,
    deleteUser,
    editUser,
    forgotPassword,
    getUser,
    login,
    logout,
    refreshToken,
    register,
    sendVerificationCode,
    verifyEmail
} = '../controllers/user/index.js';
*/