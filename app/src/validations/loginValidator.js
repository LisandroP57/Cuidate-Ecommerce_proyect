const { check, body} = require("express-validator");
//const { users } = require("../data");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models")

module.exports = [
    check("email")
    .notEmpty()
    .withMessage("El email es necesario").bail()
    .isEmail()
    .withMessage("Email inválido"),

    body("email")
    .custom(value => {
        let user = users.find(user => user.email === value)

        return user!== undefined;
    })
    .withMessage("Email no registrado"),

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body("pass")
    .custom ((value, { req }) => {
        return user.findOne({
            where: {
                email: req.body.email,
            }
        })
        .then((user) => {
            if(!bcrypt.compareSync(value, user.dataValues.pass)) {
                return Promise.reject();
            }
        })
        .catch(() => Promise.reject("El email o la contraseña es incorrecto."))
    }),
]