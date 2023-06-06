        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const {
        search,
        cart,
        detail,
        category,
        subcategory,
        addToCart,
 } = require("../controllers/productsController");

const userInSessionCheck = require("../middlewares/userInSessionCheck");

        /* Vistas productos */

router
        /* Search */
        .get('/search', search)
        /* Shopping cart */
        .get('/shoppingcart', userInSessionCheck, cart)
        .post("/shoppingcart/:id", addToCart)
        /* Detail product */
        .get('/detail/:id/', detail)
        /* Categories products */
        .get("/category/:id", category)
        /* Subcategories products */
        .get("/subcategory/:id", subcategory);

module.exports = router;