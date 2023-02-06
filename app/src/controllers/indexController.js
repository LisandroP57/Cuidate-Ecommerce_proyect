module.exports = {
    index: (req, res) => {
      res.render("products/index")
    },
    carrito: (req, res) => {
      res.render("products/carrito")
    },
    vistaProducto: (req, res) => {
      res.render("products/vistaProducto")
    },
}