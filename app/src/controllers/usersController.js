const { users, writeUsersJson } = require("../data");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {

    login: (req, res) => {
        return res.render('users/login', { session: req.session });
        },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            /* Si no hay errores en el login el usuario ya fue validado entrando asi en la condicion de la busqueda por find */
            let user = users.find(user => user.email === req.body.email);

            req.session.user = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                type: user.type,
            }

            let cookieLifeTime = new Date(Date.now() + 60000);
            let rememberMe = req.body.remember;

            if(rememberMe) {
                res.cookie(
                    "userCuidate", 
                    req.session.user, 
                    {
                        expires: cookieLifeTime,
                        httpOnly: true
                    });
            } else {
                res.clearCookie("userCuidate");
            }

            res.locals.user = req.session.user

            res.redirect("/");
        } else {
            return res.render("users/login", {
                errors: errors.mapped(),
                session: req.session
            })
        }
    },

    register: (req, res) => {
        return res.render('users/register', { session: req.session })
        },
    forgetPassword: (req, res) => {
        return res.render('users/forgetPassword', { session: req.session });
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
        last_name: req.body.last_name,
        email: req.body.email,
        pass: bcrypt.hashSync(req.body.pass1, 12),
        avatar: req.file ? req.file.filename : "/images/avatar/default-image.png",
        type: "USER",/* address, Lo dejo asi, porque los usuarios que entren a la aplicacion van a ser usuarios */
       };

       users.push(newUser);/* tengo creado el usuario le digo que lo pushe en el json */
       writeUsersJson(users);/* Los persisto o creo */
       res.redirect("/users/login");
        } else {
            //return res.send(errors)
            res.render("users/register", {
                errors: errors.mapped(),
                session: req.session
        })
        }
    },
    logOut: (req, res) => {
        req.session.destroy();
        res.redirect("/");

    },
    profile: (req, res) => {
        const usserInSessionId = req.session.user.id;/*  */
        let usserInSession = users.find(user => user.id === usserInSessionId);

        res.render("users/userProfile", {
            user: usserInSession,
            session: req.session
        })
    },
    editProfile: (req, res) => {
        let userInSessionId = req.session.user.id;
        let userInSession = users.find(user => user.id === userInSessionId);
        
        res.render("users/userProfileEdit", {
            user: userInSession,
            session: req.session
        })
    },
    updateProfile: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            let userId = req.session.user.id;
            let user = users.find(user => user.id === userId);
            const {
                name,
                last_name,
                address,
                postal_code,
                province,
                city,
            } = req.body;

            user.name = name;
            user.last_name = last_name;
            user.adress = address;
            user.postal_code = postal_code;
            user.province = province;
            user.city = city;
            user.avatar = req.file ? req.file.filename : user.avatar;

            writeUsersJson(users)
            delete user.pass;
            req.session.user = user;
            return res.redirect("/users/profile");
            
        } else {
            const userInSessionId = req.session.user.id;
            const userInSession = users.find(user => user.id === userInSessionId);

            return res.render("user/userProfileEdit", {
                user: userInSession,
                session: req.session,
                errors: errors.mapped(),
            })
        }
    }
}