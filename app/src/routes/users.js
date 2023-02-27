        /* Require's */
const express = require('express');
const router = express.Router();
        /* Controller Require */
        /* cone ste destructuring cada vez que tenga un metodo nuevo lo voy agregando en esta constante, para no repetir *controller* tantas veces */
const { login, register, processRegister} = require('../controllers/usersController');
/* middleware que me permitira subir el archivoo=> voy a userController */
const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator")

/* router
        .post('/save', usersController.saveUser) */
router
        .get('/register', register)
                /* POST: creando usuario: createUser*/
        .post('/register', uploadAvatar.single("avatar"), registerValidator,processRegister); 
router
        .get('/login', login)
        .get('/processRegister', processRegister)
/* router
        .post('/login', usersController.create); */





        /* Para agregar una edicion de usuario futura:
router.get('/edit/:idUser', usersController.edit); */

        /* Para agregar una busqueda de home:
/* router.get('/search', usersController.search); */

module.exports = router;