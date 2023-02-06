module.exports = {
    carrito: (req, res) => {
        return res.render("products/carrito");
    },
    vistaProducto: (req, res) => {
        return res.render("products/vistaProducto");
    },
}