const { check, body} = require("express-validator");
const { users } = require("../data");

module.exports = [
    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),

    body("email")
    .custom(value => {
        let user = users.find(user => user.email === value)

        return user!== undefined;
    })
    .withMessage("Email no esta registrado"),

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body("pass")
    .custom((value, { req }) => {
        let user = users.find (user=> user.email === req.body.email)

        return user.pass === value;
    })
    .withMessage('Contraseña invalida'),
]




