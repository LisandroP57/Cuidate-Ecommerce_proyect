        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const {
        carrito,
        detail,
 } = require("../controllers/productsController");

const userInSessionCheck = require("../middlewares/userInSessionCheck");


        /* Vistas productos */
router
        /* Shopping cart */
        .get('/carrito',userInSessionCheck, carrito)

        /* Detail product */
        .get('/detail/:id/', detail)

module.exports = router;