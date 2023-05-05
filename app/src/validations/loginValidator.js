const { check, body} = require("express-validator");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models")
let qs = (elemento) => {
    return document.querySelector(elemento);
}

window.addEventListener("load", ()=> {
    
})

module.exports = [
    check("email")
    .notEmpty()
    .withMessage("El email es necesario").bail()
    .isEmail()
    .withMessage("Email inválido"),
    
    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body("pass")
    .custom((value, { req }) => {
        return User.findOne({
            where: {
                email: req.body.email,
            }
        })
        .then((user) => {
            if(!bcrypt.compareSync(value, user.dataValues.pass)) {
                return Promise.reject();
            }
        })
        .catch(() => Promise.reject("Email o contraseña invalido."))
    }),
]