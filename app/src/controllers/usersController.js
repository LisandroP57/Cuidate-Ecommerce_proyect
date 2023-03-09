const { users, writeUsersJson } = require("../data");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {

    login: (req, res) => {
        return res.render('users/login');
        },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            res.send("Usuario logueado")
        } else {
            return res.render("users/login", {
                errors: errors.mapped(),
            })
        }
        },
    register: (req, res) => {
        return res.render('users/register');
        },
    forgetPassword: (req, res) => {
        return res.render('users/forgetPassword');
        },

    processRegister: (req, res) => {
        
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            let lastId = 0;

                  users.forEach(user => {
                    if(user.id > lastId) {
                        lastId = user.id;
                    }
                   });
        let newUser = {
        id: lastId + 1,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        pass: bcrypt.hashSync(req.body.pass1, 12),
        avatar: req.file ? req.file.filename : "/images/avatar/default-image.png",
        type: "USER",/* address, Lo dejo asi, porque los usuarios que entren a la aplicacion van a ser usuarios */
       };

       users.push(newUser);/* tengo creado el usuario le digo que lo pushe en el json */
       writeUsersJson(users);/* Los persisto o creo */
       res.send("Usuario creado")
        } else {
            res.render("user/register", {
                errors: errors.mapped(),
        })
        }
    }
}