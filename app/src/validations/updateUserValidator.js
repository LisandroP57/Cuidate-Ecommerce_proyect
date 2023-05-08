const { check } = require("express-validator");

module.exports = [
    check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

    check("last_name")
    .notEmpty()
    .withMessage("El apellido es obligatorio"),

    check("email")
    .notEmpty()
    .withMessage("El email es necesario").bail()
    .isEmail()
    .withMessage("Email inválido"),

    /* check("postal_code")
    .isNumeric()
    .withMessage("Solo puedes ingresar números"), */
]