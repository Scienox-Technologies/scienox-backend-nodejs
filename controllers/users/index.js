const { getUsers } = require('./getUsers.js')
// const { getAllUserType } = require('./getAllUserType.js');
// const { getUser } = require('./getUser.js')
// const { deleteUser } = require('./deleteUser.js')
// const { updateUser } = require('./updateUser.js');
const { createUser } = require('./createUser.js');


module.exports = {
    getUsers,
    // getAllUserType,
    // getUser,
    // deleteUser,
    // updateUser,
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