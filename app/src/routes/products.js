        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const {
        carrito,
        index,
        detail,
        create,
        store,
        edit,
        update,
        destroy
 } = require("../controllers/productsController");

const {uploadImageProduct} = require("../middlewares/upload");
const productValidator = require("../validations/productValidator");

        /* Vistas productos */
router
        .get('/carrito', carrito)
        .get('/products', index)

        /* Detail product */
        .get('/detail/:id/', detail)
        
        /* Create product */
        .get('/create', create)
        .post("/", uploadImageProduct.single("image"), productValidator, store)

        /* Edit product */
        .get('/edit/:id', edit)
        .put('/edit/:id', uploadImageProduct.single("image"), productValidator, update)

        /* Delete product*/
        .delete('/delete/:id', destroy); 

module.exports = router;