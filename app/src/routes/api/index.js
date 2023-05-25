const express = require("express");
const router = express.Router();

const { list, detail } = require("../../controllers/api/categoriesController");
const userRouter = require("./user");
const productRouter = require("./product");

/* Categorías */
router.get("/category", list);
router.get("/category/:id", detail);

module.exports = [userRouter, productRouter, router];