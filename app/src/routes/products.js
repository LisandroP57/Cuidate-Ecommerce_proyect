        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const controller = require("../controllers/productsController");

router.get('/carrito', controller.carrito);
router.get('/vistaProducto', controller.vistaProducto);
router.get('/creacion', controller.creacion);
router.get('/edicion', controller.edicion);

module.exports = router;