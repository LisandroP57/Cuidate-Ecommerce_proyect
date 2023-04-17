const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models");

module.exports = {
    login: (req, res) => {
        res.render('users/login', { session: req.session });
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            User.findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then((user) => {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    role: user.role
                }

                let cookieLifeTime = new Date(Date.now() + 60000);
                
                if (req.body.remember) {
                    res.cookie(
                        "userCuidate",
                        req.session.user,
                        {
                            expires: cookieLifeTime,
                            httpOnly: true
                        })
                }

                res.locals.user = req.session.user;
                
                res.redirect("/");
            })
            .catch(error => console.log())
        } else {
            return res.render("users/login", {
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    register: (req, res) => {
        return res.render('users/register', {
            session: req.session
        })
    },
    forgetPassword: (req, res) => {
        return res.render('users/forgetPassword', {
            session: req.session
        })
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let newUser = {
                name: req.body.name,
                last_name: req.body.last_name,
                email: req.body.email,
                pass: bcrypt.hashSync(req.body.pass1, 12),
                avatar: req.file ? req.file.filename : "default-image.png",
                role: 0,
            };

            User.create(newUser)
            .then(() => {
                return res.redirect("/users/login");
            })
            .catch(error => console.log(error))
        } else {
            res.render("users/register", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        if (req.cookies.userCuidate) {
            res.cookie("userCuidate", "", { maxAge: -1})
        }

        res.redirect("/");

    },
    profile: (req, res) => {
        const userInSessionId = req.session.user.id;

        User.findByPk(userInSessionId)
            .then((user) => {
                res.render("users/userProfile", {
                    user: user,
                    session: req.session
                })
            })
            .catch(error => console.log(error))
    },
    editProfile: (req, res) => {
        let userInSessionId = req.session.user.id;

        User.findByPk(userInSessionId)
        .then((userInSession) => {
            res.render("users/userProfileEdit", {
                user: userInSession,
                session: req.session
            });
        })
        .catch((error) => {
            console.log(error)
        });
    },
    updateProfile: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let userId = req.session.user.id;

            /* let user = users.find(user => user.id === userId); */

            const {
                name,
                last_name,
                /* address,
                postal_code,
                province,
                city, */
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