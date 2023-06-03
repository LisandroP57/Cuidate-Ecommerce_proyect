 const { check, body} = require("express-validator");
 const { User } = require("../database/models");
 
 module.exports = [
     check("name")
     .notEmpty()
     .withMessage("Nombre es obligatorio")
     .isLength({ min: 2 })
     .withMessage("El nombre tiene que tener mínimo 2 carácteres")
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
     .isLength({ min: 2 })
     .withMessage("El apellido tiene que tener mínimo 2 carácteres")
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
     .withMessage("El email es obligatorio").bail()
     .isEmail()
     .withMessage("Email inválido"),
     
     body("email")
     .custom(async (value) => {
        try {
            const user = await User.findOne({
                where: {
                    email: value
                }
            });
            if (user) {
                return Promise.reject("El email ya se encuentra registrado");
            }
        } catch (error) {
            return Promise.reject(error.message);
        }
    }),
 
     check('pass1')
     .notEmpty()
     .withMessage('Debes escribir tu contraseña').bail()
     .isLength({ min: 8 })
     .withMessage('La contraseña debe tener como mínimo 8 caracteres').bail()
     .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+~\-=`{}\[\]:;"'<>,.?\/\\|]).{8,}$/)
     .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'),
 
     body('pass2')
     .custom((value, {req}) => value !== req.body.pass1 ? false : true)
     .withMessage('Las contraseñas no coinciden'),

     check('avatar')
     .optional()
     .custom((value, { req }) => {
        if (!req.file) {
            return true;
        }
        if (!req.file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            throw new Error('Debes subir un archivo de imagen válido (JPG, JPEG, PNG, GIF)');
        }
        return true;
    })
    .withMessage('Debes subir una imagen si deseas cambiar tu foto de perfil'),
 
     check('terms')
     .isString('on')
     .withMessage('Debes aceptar los términos!')
 ]