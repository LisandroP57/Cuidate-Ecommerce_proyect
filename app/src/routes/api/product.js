const express = require("express");
const router = express.Router();
const { getProducts, getProductById } = require("../../controllers/api/product.controller");
const verifyToken = require("../../middlewares/jwt.middleware");

router
    .get("/", verifyToken, getProducts)
    .get("/:id", getProductById)
    
module.exports = router;