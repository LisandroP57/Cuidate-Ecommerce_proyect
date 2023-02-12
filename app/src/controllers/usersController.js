module.exports = {
    login: (req, res) => {
        return res.render('users/login');
    },
    register: (req, res) => {
        return res.render('users/register');
    },
/*     search: (req, res) => {
        return res.render('users/search');
    },    
    edit: function(req, res) {
        let idUser = req.params.idUser;
        res.send(idUser);
    }, */
}