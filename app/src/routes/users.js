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
        logOut
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
        
        .get('/login', sessionUserCheck, login)
        .post('/login', loginValidator, processLogin)

        .get('/logout', logOut)

        .get('/profile', userInSessionCheck, profile) /* Agregar en ambas el userInSessionCheck** */
        .get('/profile/edit', userInSessionCheck, editProfile) /* !important */
        .put("/profile/edit", uploadAvatar.single("avatar"), updateUserValidator, updateProfile)

        .get('/forgetPassword', forgetPassword)
        .get('/processRegister', processRegister)

module.exports = router;