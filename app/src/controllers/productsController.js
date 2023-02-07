module.exports = {
    carrito: (req, res) => {
        return res.render("products/carrito")
    },
    vistaProducto: (req, res) => {
        return res.render("products/vistaProducto")
    },
    creacion: (req, res) => {
        return res.render("products/creacion")
    },
    edicion: (req, res) => {
        return res.render("products/edicion")
    },
}