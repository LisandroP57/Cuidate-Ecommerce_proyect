const { check } = require("express-validator");

module.exports = [
    check('name')
    .notEmpty()
    .withMessage("Debe contener el nombre del producto").bail()
    .isLength({ min: 5, max: 15 })
    .withMessage("El nombre tiene que tener entre 5 y 15 caracteres"),
    
    check('description')
    .notEmpty()
    .withMessage("Debe contener su descripción").bail()
    .isLength({ min: 15 })
    .withMessage("La descripcion tiene que tener un mínimo de 15 caracteres"),
    
    check('price')
    .notEmpty()
    .withMessage("Debe contener el precio")
    .isFloat({ min: 1 })
    .withMessage("El producto lo estarías dando gratis..."),
    
    check('discount')
    .isInt({ min: 0, max: 90 })
    .withMessage("Error en el descuento, lo recomendable es entre 0 y 90%"),
    
];