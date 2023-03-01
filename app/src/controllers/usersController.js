const { users, writeUsersJson } = require("../data");
const { validationResult } = require("express-validator");

module.exports = {

    login: (req, res) => {
        return res.render('users/login');
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pass: req.body.pass,
        type: "USER",/* address, Lo dejo asi, porque los usuarios que entren a la aplicacion van a ser usuarios */
        avatar: req.file ? req.file.filename : "/images/avatars/default-image.png"
       };

       users.push(newUser);/* tengo creado el usuario le digo que lo pushe en el json */
       writeUsersJson(users);/* Los persisto o creo */
       res.send("Usuario creado")
        } else {
            res.send( errors.mapped())
           /*  res.render("users/register", {
                errors: errors.mapped(),
                old: req.body
            }) */
      
        }

      
    }
}