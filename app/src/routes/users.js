        /* Require's */
const express = require('express');
const router = express.Router();

        /* Controller Require */
const {
        login,
        register,
        processRegister,
        forgetPassword,
        processLogin,
        profile,
        editProfile,
        updateProfile,
        logout
 } = require('../controllers/usersController');

const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const userInSessionCheck = require("../middlewares/userInSessionCheck");
const updateUserValidator = require("../validations/updateUserValidator");
const sessionUserCheck = require("../middlewares/sessionUserCheck");

router
/* POST: creando usuario: createUser*/
        .get('/register', sessionUserCheck, register)
        .post('/register', uploadAvatar.single("avatar"), registerValidator, processRegister)
        .get('/processRegister', processRegister)
        
        .get('/login', sessionUserCheck, login)
        .post('/login', loginValidator, processLogin)

        .get('/forgetPassword', forgetPassword)
        .get('/logout', logout)

        .get('/profile', userInSessionCheck, profile)
        .get('/profile/edit', userInSessionCheck, editProfile)
        .put('/profile/edit', uploadAvatar.single("avatar"), updateUserValidator, updateProfile)

module.exports = router;