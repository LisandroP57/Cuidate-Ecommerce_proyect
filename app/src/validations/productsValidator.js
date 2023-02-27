const { check } = require("express-validator");
const path = require("path");
module.exports = [
    check('name')
    .notEmpty()
    .withMessage("Debe contener el nombre del producto").bail().isLength({ min: 5, max: 15 })
    .withMessage("El nombre tiene que tener entre 5 y 15 caracteres"),
    
    check('description')
    .notEmpty()
    .withMessage("Debe contener su descripción").bail().isLength({ min: 15 })
    .withMessage("La descripcion tiene que tener un mínimo de 15 caracteres"),
    
    check('price')
    .notEmpty()
    .withMessage("Debe contener el precio").isFloat({ min: 1 })
    .withMessage("El producto lo estarías dando gratis..."),
    
    check('discount')
    .isInt({ min: 0, max: 90 })
    .withMessage("Error en el descuento, lo recomendable es entre 0 y 90%"),
    
    check('image')
    .custom((value, {req}) => {
        const file = req.file;
        const acceptedExtensions = [".jpg", ".png", ".gif"];
        if (!file) {
            throw new Error("Tiene que subir una imagen");
        } else if (!acceptedExtensions.includes(path.extname(file.originalname))) {
            throw new Error("Las extensiones requeridas son: png y jpg");
        }
        return true;
    }),
];