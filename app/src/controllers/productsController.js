module.exports = {
    carrito: (req, res) => {
        return res.render("products/carrito")
    },
    vistaProducto: (req, res) => {
        return res.render("products/vistaProducto")
    },
    create: (req, res) => {
        return res.render("products/create")
    },
    edit: (req, res) => {
        return res.render("products/edit")
    },
}