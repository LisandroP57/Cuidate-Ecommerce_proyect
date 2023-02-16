module.exports = {
    
    carrito: (req, res) => res.render("products/carrito"),

    vistaProducto: (req, res) => res.render("products/vistaProducto"),

    create: (req, res) => res.render("products/create"),

    edit: (req, res) => {
		let productId = Number( req.params.id);

		let productToEdit = products.find(product => product.id === productId);
		res.render("product-edit-form",{
			productToEdit,
		});
    }
}