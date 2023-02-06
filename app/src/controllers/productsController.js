module.exports = {
    creacion: (req, res) => {
        return res.render("products/product-create")
    },
    edicion: (req, res) => {
        return res.render("products/product-edit")
    },
}