module.exports = {
    index: (req, res) => {
      res.render("index")
    },
    carrito: (req, res) => {
      res.render("products/carrito")
    },
    vistaProducto: (req, res) => {
      res.render("products/vistaProducto")
    },
}