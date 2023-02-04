const controller = {
    index: (req, res) => {
        return res.render('home');
    },
    vistaProducto: (req, res) => {
        return res.render('vistaProducto');
    },
    carrito: (req, res) => {
        return res.render('carrito');
    },
    login: (req, res) => {
        return res.render('users/login');
    },
    register: (req, res) => {
            return res.render('users/register');
    },
}

module.exports = controller;