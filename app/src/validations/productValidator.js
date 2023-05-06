const { check } = require("express-validator");

module.exports = [
    check('name')
    .notEmpty()
    .withMessage("Debe contener el nombre del producto")
    .isLength({ min: 5 })
    .withMessage("El nombre tiene que tener mínimo 5 carácteres"),

   /*  check ("image")
    
    .withMessage("El tipo de archivo debe ser JPG, JPEG, PNG, GIF"), */

    check("category")
    .notEmpty()
    .withMessage("La categoría es obligatoria"),
    
    check("subcategory")
    .notEmpty()
    .withMessage("La subcategoría es obligatoria"),

    check('price')
    .notEmpty()
    .withMessage("El producto lo estarías dando gratis...")
    .isNumeric()
    .withMessage("Solo puedes ingresar números"),
]