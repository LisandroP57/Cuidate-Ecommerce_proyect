        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const {
        search,
        shoppingcart,
        detail
 } = require("../controllers/productsController");

const userInSessionCheck = require("../middlewares/userInSessionCheck");

        /* Vistas productos */

router
        /* Search */
        .get('/search', search)
        /* Shopping cart */
        .get('/shoppingcart', userInSessionCheck, shoppingcart)

        /* Detail product */
        .get('/detail/:id/', detail);

module.exports = router;