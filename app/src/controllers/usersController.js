const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models");
const axios = require("axios");
const {generateToken} = require("../helpers/jwt.helper")


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

                const token = generateToken(user);

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
                
                res.redirect(`/?token=${token}`);
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
        return res.render('users/register', {session: req.session})
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
                phone: ""
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
                res.locals.user = user;
                res.render("users/userProfile", {
                    user,
                    session: req.session
                })
            })
            .catch(error => console.log(error))
    },
    editProfile: async (req, res) => {
        let userInSessionId = req.session.user.id;

        try {
            const user = await User.findByPk(userInSessionId);
            const { data } = await axios.get("https://apis.datos.gob.ar/georef/api/provincias?campos=nombre,id")
            
            res.render("users/userProfileEdit", {
                user,
                provinces: data.provincias,
                session: req.session
            })
        } catch (error) {
            console.log(error)
        }
    },
    updateProfile: async (req, res) => {
        let errors = validationResult(req);
      
        if (errors.isEmpty()) {
          let userId = req.session.user.id;
      
          try {
            const user = await User.findByPk(userId);
      
            const {
              name,
              last_name,
              tel,
              address,
              postal_code,
              province,
              city,
            } = req.body;
      
            user.name = name;
            user.last_name = last_name;
            user.tel = tel;
            user.address = address;
            user.postal_code = postal_code;
            user.province = province;
            user.city = city;
            user.avatar = req.file ? req.file.filename : user.avatar;
      
            delete user.password;
      
            await user.save();
      
            req.session.user = user;
      
            return res.redirect("/users/profile");
          } catch (error) {
            console.log(error);
          }
        } else {
          const userInSessionId = req.session.user.id;
      
          try {
            const userInSession = await User.findByPk(userInSessionId);
      
            return res.render("users/userProfileEdit", {
              user: userInSession,
              session: req.session,
              errors: errors.mapped(),
            });
          } catch (error) {
            console.log(error);
          }
        }
    },
    googleLogin: async (req, res) => {
        let user = req.session.passport.user;
        req.session.user = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            role: user.role
        }
        res.redirect("/")
    },
}