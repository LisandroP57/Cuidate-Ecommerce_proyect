        /* Require's */
const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

        /* Controller Require */
const controller = require('../controllers/usersController')

/* router.post('/save', usersController.saveUser) */

router.get('/login', controller.login);
/* router.post('/login', usersController.create); */

router.get('/register', controller.register);
/* router.post('/register', usersController.createUser); */



        /* Para agregar una edicion de usuario futura:
router.get('/edit/:idUser', controller.edit); */

        /* Para agregar una busqueda de home:
/* router.get('/search', controller.search); */

module.exports = router;