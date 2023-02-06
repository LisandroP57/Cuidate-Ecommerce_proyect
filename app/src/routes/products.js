const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController");

router.get('/vistaProducto', controller.vistaProducto);

router.get('/carrito', controller.carrito);

module.exports = router;