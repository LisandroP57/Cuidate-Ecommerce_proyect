        /* Require's */
const express = require('express');
const router = express.Router();

        /* Controller Require */
        /* con este destructuring cada vez que tenga un metodo nuevo lo voy agregando en esta constante, para no repetir *controller* tantas veces */
const { login, register, processRegister, forgetPassword, processLogin } = require('../controllers/usersController');
/* middleware que me permitira subir el archivoo=> voy a userController */
const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");

router
/* POST: creando usuario: createUser*/
        .get('/register', register)
        .post('/register', uploadAvatar.single("avatar"), registerValidator, processRegister)
        
        .get('/login', login)
        .post('/login', loginValidator, processLogin)

        .get('/forgetPassword', forgetPassword)
        .get('/processRegister', processRegister)

module.exports = router;