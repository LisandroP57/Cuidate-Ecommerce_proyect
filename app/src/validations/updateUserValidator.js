const { check } = require("express-validator");
const path = require("path");

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

    check("avatar")
    .custom((value, { req }) => {
      const file = req.file;
      if (!file) {
        return true;
      }
      
      const allowedExtensions = [".jpg", ".png", ".jpeg", ".svg", ".gif"];
      const fileExtension = path.extname(file.originalname);
      const isValidExtension = allowedExtensions.includes(fileExtension);
  
      if (!isValidExtension) {
        throw new Error("El avatar tiene que ser .JPG, .PNG, .GIF, .SVG, .JPEG");
      }
      return true;
  }),
]