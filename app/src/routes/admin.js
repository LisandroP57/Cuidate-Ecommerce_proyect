const express = require("express");
const router = express.Router();

const {
    create,
    store,
    edit,
    /* update,
    destroy */
} = require("../controllers/adminController");

const {uploadImageProduct} = require("../middlewares/upload");
const productValidator = require("../validations/productValidator");
const userInSessionCheck = require("../middlewares/userInSessionCheck");
const userSessionAdmin = require("../middlewares/userSessionAdmin");

/* Vistas productos */
router
        /* Create product */
        .get('/products/create', userInSessionCheck, userSessionAdmin, create)
        .post("/products/create", uploadImageProduct.single("image"), productValidator, store)

        /* Edit product */
        .get('/products/edit/:id', userInSessionCheck, userSessionAdmin, edit)
        //.put('/products/edit/:id', uploadImageProduct.single("image"), productValidator, update)

        /* Delete product*/
        //.delete('/products/delete/:id', userInSessionCheck, userSessionAdmin, destroy);

module.exports = router;