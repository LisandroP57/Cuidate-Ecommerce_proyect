        /* Require's */
const express = require('express');
const router = express.Router();

        /* Controller Require */
const usersController = require('../controllers/usersController')

/* router.post('/save', usersController.saveUser) */

router.get('/login', usersController.login);
/* router.post('/login', usersController.create); */

router.get('/register', usersController.register);
/* router.post('/register', usersController.createUser); */



        /* Para agregar una edicion de usuario futura:
router.get('/edit/:idUser', usersController.edit); */

        /* Para agregar una busqueda de home:
/* router.get('/search', usersController.search); */

module.exports = router;