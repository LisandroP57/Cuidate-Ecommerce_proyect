const { check, body} = require("express-validator");
const { User } = require("../database/models")


module.exports = [
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
            return Promise.reject("Email invalido o inexistente");
        }
    }),

]