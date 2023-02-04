const controller = {
    index: (req, res) => {
        return res.render('home');
    },
    vistaProducto: (req, res) => {
        return res.render('vistaProducto');
    },
    login: (req, res) => {
        return res.render('users/login');
    },
    register: (req, res) => {
            return res.render('users/register');
    },
}

module.exports = controller;