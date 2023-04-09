        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const {
        products,
        carrito,
        detail
 } = require("../controllers/productsController");

const userInSessionCheck = require("../middlewares/userInSessionCheck");


        /* Vistas productos */
router
        /* All products */
        .get('/allProducts', products)
        /* Shopping cart */
        .get('/carrito',userInSessionCheck, carrito)

        /* Detail product */
        .get('/detail/:id/', detail)

module.exports = router;