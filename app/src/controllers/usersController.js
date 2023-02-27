const { users, writeUsersJson } = require("../data");
const { validationResult } = require("express-validator");

module.exports = {

    login: (req, res) => {
        return res.render('users/login')
        },
    register: (req, res) => {
        return res.render('users/register')
        },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
                  /* .. aca guardamos el nuevo obejtoq ue contendra las nuevas propiedades en el json*/
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
            res.render("register",{

                errors: errors.mapped(),
                old: req.body
            })
    
        }

       let lastId = 0;/* que arranque en cero */
       /* y que entre a la variable users y recorra cada usuario, si el id de ese usuario es mayor al anterior se crea...un nuevo usuario y va a obetener unnuevo id*/
       users.forEach(user => {
        if(user.id > lastId) {
            lastId = user.id;
        }
       });
  

    }
}
/*     search: (req, res) => res.render('users/search');    

        Edicion de usuarios futura
    edit: function(req, res)
        let idUser = req.params.idUser;
        res.send(idUser); */