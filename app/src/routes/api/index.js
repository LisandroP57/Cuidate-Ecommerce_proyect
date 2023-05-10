const express = require("express");
const router = express.Router();

const { list, detail} = require("../../controllers/api/categoriesController");

            /* Categorías */
router
    .get("category", list)
    .get("category/:id", detail)

module.exports = router;