module.exports = {
    
    carrito: (req, res) => res.render("products/carrito"),

    vistaProducto: (req, res) => res.render("products/vistaProducto"),

    create: (req, res) => res.render("products/create"),

    edit: (req, res) => res.render("products/edit"),
}