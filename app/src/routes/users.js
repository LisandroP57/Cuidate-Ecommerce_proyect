        /* Require's */
const express = require('express');
const router = express.Router();

        /* Controller Require */
        /* con este destructuring cada vez que tenga un metodo nuevo lo voy agregando en esta constante, para no repetir *controller* tantas veces */
const { login, register, processRegister, forgetPassword } = require('../controllers/usersController');
/* middleware que me permitira subir el archivoo=> voy a userController */
const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");

router
        .get('/register', register)
                /* POST: creando usuario: createUser*/
        .post('/register', uploadAvatar.single("avatar"), registerValidator, processRegister)
        
        .get('/login', login)
        .get('/forgetPassword', forgetPassword)
        .get('/processRegister', processRegister)

module.exports = router;