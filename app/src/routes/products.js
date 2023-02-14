        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const controller = require("../controllers/productsController");

router.get('/carrito', controller.carrito);
router.get('/vistaProducto', controller.vistaProducto);
router.get('/create', controller.create);
router.get('/edit', controller.edit);

module.exports = router;