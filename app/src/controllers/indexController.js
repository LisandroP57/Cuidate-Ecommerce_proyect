const controller = {
    index: (req, res) => {
        return res.render('home');
    },
    login: (req, res) => {
        return res.render('users/login');
    },
    register: (req, res) => {
        return res.render('users/register');
    },
    vistaProducto: (req, res) => {
        return res.render('vistaProducto');
    },
}

module.exports = controller;