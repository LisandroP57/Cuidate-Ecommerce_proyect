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
        updateProfile
 } = require('../controllers/usersController');

const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const updateUserValidator = require("../validations/updateUserValidator");

router
/* POST: creando usuario: createUser*/
        .get('/register', register)
        .post('/register', uploadAvatar.single("avatar"), registerValidator, processRegister)
        
        .get('/login', login)
        .post('/login', loginValidator, processLogin)

        .get('/profile', profile) /* Agregar en ambas el userInSessionCheck** */
        .get('/profile/edit', editProfile) /* !important */
        .put("/profile/edit", uploadAvatar.single("avatar"), updateUserValidator, updateProfile)

        .get('/forgetPassword', forgetPassword)
        .get('/processRegister', processRegister)

module.exports = router;