        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const {
        search,
        shoppingcart,
        detail,
        category,
        subcategory
 } = require("../controllers/productsController");

const userInSessionCheck = require("../middlewares/userInSessionCheck");

        /* Vistas productos */

router
        /* Search */
        .get('/search', search)
        /* Shopping cart */
        .get('/shoppingcart', userInSessionCheck, shoppingcart)
        /* Detail product */
        .get('/detail/:id/', detail)
        /* Categories products */
        .get("/category/:id", category)
        /* Subcategories products */
        .get("/subcategory/:id", subcategory);

module.exports = router;