const { getUsers } = require('./getUsers.js')
const { getUser } = require('./getUser.js')
const { deleteUser } = require('./deleteUser.js')
const { updateUser } = require('./updateUser.js');
const { createUser } = require('./createUser.js');


module.exports = {
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    createUser
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