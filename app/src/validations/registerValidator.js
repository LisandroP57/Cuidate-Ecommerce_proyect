 const { check, body} = require("express-validator");
 const { User } = require("../database/models");
 
 module.exports = [
     check("name")
     .notEmpty()
     .withMessage("Nombre es obligatorio"),
 
     check("last_name")
     .notEmpty()
     .withMessage("El apellido es obligatorio"),
 
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
     .isLength({
         min: 6,
     })
     .withMessage('La contraseña debe tener como mínimo 6 caracteres'),
 
     body('pass2')
     .custom((value, {req}) => value !== req.body.pass1 ? false : true)
     .withMessage('Las contraseñas no coinciden'),
 
     check('terms')
     .isString('on')
     .withMessage('Debes aceptar los términos y condiciones!')
 ]