const controller = {
    index: (req, res) => {
        return res.render('index');
    },
    login: (req, res) => {
        return res.render('login');
    },
    register: (req, res) => {
        return res.render('register');
    },
    vistaProducto: (req, res) => {
        return res.render('vistaProducto');
    },
}

module.exports = controller;