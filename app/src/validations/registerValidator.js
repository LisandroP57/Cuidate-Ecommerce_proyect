/* Hacemos las validaciones del lado del backend/servidor, 
es decir que con estas reglas de seguriridad no podran entrar
 y robar informacion, traficar datos, hackear nuestra informacion 
 de la pagina. Las pueden romper, pero solo en caso de que el 
 atacante tenga acceso a los archivos y a las validadciones */
const { check, body} = require("express-validator");
const { users } = require("../data");

module.exports = [
    check("firstName")
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
    .custom((value) => {
        let user = users.find(user => user.email === value);

        return user === undefined;
    })

    .withMessage("Email ya registrado"),

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña').bail()
    .isLength({
        min: 6
    }),

    check('terms')
    .isString('on')
    .withMessage('Debes aceptar los términos y condiciones')
]