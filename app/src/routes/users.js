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
        profile
 } = require('../controllers/usersController');

const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");

router
/* POST: creando usuario: createUser*/
        .get('/register', register)
        .post('/register', uploadAvatar.single("avatar"), registerValidator, processRegister)
        
        .get('/login', login)
        .post('/login', loginValidator, processLogin)

        .get("/profile", profile)

        .get('/forgetPassword', forgetPassword)
        .get('/processRegister', processRegister)

module.exports = router;