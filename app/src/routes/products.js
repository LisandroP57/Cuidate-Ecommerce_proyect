        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const productsController = require("../controllers/productsController");
const {uploadImageProduct} = require("../middlewares/upload");

        /* Vistas productos */
router
        .get('/carrito', productsController.carrito)
        .get('/products', productsController.index)

        /* Detail product */
        .get('/detail/:id/', productsController.detail)
        
        /* Create product */
        .get('/create', productsController.create)
        .post('/', productsController.store)

        /* Edit product */
        .get('/edit/:id', productsController.edit)
        .put('/edit/:id', uploadImageProduct.single("image"), productsController.update)

        /* Delete product*/
        .delete('/delete/:id', productsController.destroy); 

module.exports = router;