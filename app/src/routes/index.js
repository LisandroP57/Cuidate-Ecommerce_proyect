        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const controller = require("../controllers/indexController");

router.get('/home', controller.index);
router.get('/', controller.index);

router.get('/login', controller.login);

router.get('/register', controller.register);

router.get('/vistaProducto', controller.vistaProducto);

module.exports = router;