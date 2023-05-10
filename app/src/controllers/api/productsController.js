const { Product } = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
    /* getAll: async (req, res) => {
        try {
            const PRODUCTS = await Product.findAll();

            const RESPONSE = {
                endpoint: "/product",
                data: PRODUCTS,
                total: PRODUCTS.length,
            };
        }
    } */
}