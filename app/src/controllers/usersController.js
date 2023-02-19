module.exports = {

    login: (req, res) => {
        return res.render('users/login')
        },
    register: (req, res) => {
        return res.render('users/register')
        },
    forgetPassword: (req, res) => {
        return res.render('users/forgetPassword')
    },


/*     search: (req, res) => res.render('users/search');    

        Edicion de usuarios futura
    edit: function(req, res)
        let idUser = req.params.idUser;
        res.send(idUser); */
}