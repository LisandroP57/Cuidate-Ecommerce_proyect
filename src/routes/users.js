const express = require('express');
const router = express.Router();

        /* Controller Require */
const {
        login,
        register,
        processRegister,
        processLogin,
        logout,
        profile,
        forgetPassword,
        editProfile,
        updateProfile,
        destroyUser,
        googleLogin
 } = require('../controllers/usersController');

const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const userInSessionCheck = require("../middlewares/userInSessionCheck");
const updateUserValidator = require("../validations/updateUserValidator");
const forgetPassValidator = require("../validations/forgetPassValidator");
const sessionUserCheck = require("../middlewares/sessionUserCheck");
const passport = require("passport");
require("../middlewares/passportConfig")(passport);
passport.serializeUser(function(user, done) {done(null, user);});
passport.deserializeUser(function(user, done) {done(null, user);});

router
        .get('/login', sessionUserCheck, login)
        .post('/login', loginValidator, processLogin)
        
        .get('/register', sessionUserCheck, register)
        .post('/register', uploadAvatar.single("avatar"), registerValidator, processRegister)
        .get('/processRegister', processRegister)
        
        .get('/forgetPassword', sessionUserCheck, forgetPassValidator, forgetPassword)
        .get('/logout', logout)

        .get('/profile', userInSessionCheck, profile)
        .get('/profile/edit', userInSessionCheck, editProfile)
        .put('/profile/edit', uploadAvatar.single("avatar"), updateUserValidator, updateProfile)
        .delete('/profile/delete', userInSessionCheck, destroyUser)
        // Google sesion
        .get('/auth/google',
        passport.authenticate('google', { scope: ['profile', "email"] }))
        // Redireccionamiento post login
        .get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/users/login' }),
        googleLogin);

module.exports = router;