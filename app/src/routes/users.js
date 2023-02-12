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

/* router.get('/search', controller.search); */

module.exports = router;