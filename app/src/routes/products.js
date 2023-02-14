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
// Crear detail, store, destroy y update en productsController.

        /* Create product */
router.get('/create', productsController.create);
/* router.post('/', productsController.store);  */

        /* Edit product */
router.get('/edit/:id', productsController.edit);
/* router.put('/edit/:id', productsController.update);  */


        /* Delete product
        router.delete('/delete/:id', productsController.destroy);  */

module.exports = router;