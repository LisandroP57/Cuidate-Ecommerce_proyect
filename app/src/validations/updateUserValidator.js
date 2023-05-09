const { check } = require("express-validator");

module.exports = [
    check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .custom((value) => {
        if (!/^[a-zA-Z]{2,}$/.test(value)) {
          throw new Error(
            "Ingrese un nombre válido (mínimo 2 caracteres y sin números ni caracteres especiales)"
          );
        }
        return true;
      }),

    check("last_name")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .custom((value) => {
        if (!/^[a-zA-Z]{2,}$/.test(value)) {
          throw new Error(
            "Ingrese un apellido válido (mínimo 2 caracteres y sin números ni caracteres especiales)"
          );
        }
        return true;
      }),

    check("email")
    .notEmpty()
    .withMessage("El email es necesario").bail()
    .isEmail()
    .withMessage("Email inválido"),

]