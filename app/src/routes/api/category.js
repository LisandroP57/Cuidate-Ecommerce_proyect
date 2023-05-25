const express = require("express");
const router = express.Router();
const {
    getCategories,
    getCategoryById
} = require("../../controllers/api/category.controller");

router.get("/", getCategories);
router.get("/:id", getCategoryById);

module.exports = router;