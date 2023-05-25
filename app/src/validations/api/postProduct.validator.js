const { body } = require("express-validator");

const productValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").notEmpty().withMessage("Price is required").isInt().withMessage("Invalid price"),
    body("discount").optional().isInt().withMessage("Invalid discount"),
    body("description").optional().isLength({ max: 800 }).withMessage("Description exceeds maximum length"),
    body("subcategory_id").notEmpty().withMessage("Subcategory ID is required").isInt().withMessage("Invalid subcategory ID"),
  ];
};


module.exports = {
  productValidationRules,
};