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
const userInSessionCheck = require("../middlewares/userInSessionCheck");
const userSessionAdmin = require("../middlewares/userSessionAdmin");

        /* Vistas productos */
router
        .get('/carrito',userInSessionCheck, carrito)
        .get('/products', index)

        /* Detail product */
        .get('/detail/:id/', detail)
        
        /* Create product */
        .get('/create', userInSessionCheck, userSessionAdmin, create)
        .post("/", uploadImageProduct.single("image"), productValidator, store)

        /* Edit product */
        .get('/edit/:id', userInSessionCheck, userSessionAdmin, edit)
        .put('/edit/:id', uploadImageProduct.single("image"), productValidator, update)

        /* Delete product*/
        .delete('/delete/:id', userInSessionCheck, userSessionAdmin,destroy); 

module.exports = router;