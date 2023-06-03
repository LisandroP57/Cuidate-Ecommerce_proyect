const express = require("express");
const router = express.Router();

const {
    index,
    users,
    products,
    create,
    store,
    edit,
    update,
    destroy,
    destroyUser
} = require("../controllers/adminController");

const uploadImageProduct = require("../middlewares/uploadProductImage");
const productValidator = require("../validations/productValidator");
const userInSessionCheck = require("../middlewares/userInSessionCheck");
const userSessionAdmin = require("../middlewares/userSessionAdmin");

/* Vistas productos */
router
        /* Index */
        .get("/", userSessionAdmin, index)
        
        /* Users list */
        .get("/users", userSessionAdmin, users)

        /* Delete User */
        .delete('/users/delete/:id', userSessionAdmin, destroy)

        /* Products list */
        .get("/products", userSessionAdmin, products)
    
        /* Create product */
        .get('/products/create', userInSessionCheck, userSessionAdmin, create)
        .post("/products/create", uploadImageProduct.array("images"), productValidator, store)

        /* Edit product */
        .get('/products/edit/:id', userInSessionCheck, userSessionAdmin, edit)
        .put('/products/edit/:id', uploadImageProduct.array("images"), productValidator, update)

        /* Delete product*/
        .delete('/products/delete/:id', userSessionAdmin, destroy)
        /* Delete User */
        .delete('/user/delete/:id', userSessionAdmin, destroyUser);

module.exports = router;