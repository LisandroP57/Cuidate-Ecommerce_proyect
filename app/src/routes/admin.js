/* const express = require("express");
const router = express.Router();
const {
    index,
    products,
    create,
    store,
    edit,
    update,
    destroy
} = require("../controllers/adminController");
const uploadProductFile = require("../middlewares/uploadProductFile")
const productValidator = require("../validations/productValidator"); */

const express = require("express");
const router = express.Router();

const {
    allProducts,
    create,
    store,
    edit,
    update,
    destroy
} = require("../controllers/adminController");

const {uploadImageProduct} = require("../middlewares/upload");
const productValidator = require("../validations/productValidator");
const userInSessionCheck = require("../middlewares/userInSessionCheck");
const userSessionAdmin = require("../middlewares/userSessionAdmin");

/* Vistas productos */
router
        .get('/all-products', allProducts)

        /* Create product */
        .get('/create', userInSessionCheck, userSessionAdmin, create)
        .post("/", uploadImageProduct.single("image"), productValidator, store)

        /* Edit product */
        .get('/edit/:id', userInSessionCheck, userSessionAdmin, edit)
        .put('/edit/:id', uploadImageProduct.single("image"), productValidator, update)

        /* Delete product*/
        .delete('/delete/:id', userInSessionCheck, userSessionAdmin,destroy);

module.exports = router;