        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const productsController = require("../controllers/productsController");

        /* Vistas productos */
router.get('/carrito', productsController.carrito);
router.get('/vistaProducto', productsController.vistaProducto);


        /* Detail product
        router.get('/detail/:id/', productsController.detail); */

        /* Create product */
router.get('/create', productsController.create);

        /* Edit product */
router.get('/edit/:id', productsController.edit);


        /* Delete product
        router.delete('/delete/:id', productsController.destroy);  */

module.exports = router;