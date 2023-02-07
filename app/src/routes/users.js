        /* Require's */
const express = require('express');
const router = express.Router();

        /* Controller Require */
const controller = require('../controllers/usersController')

router.get('/login', controller.login);
router.get('/register', controller.register);

module.exports = router;