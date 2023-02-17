module.exports = {
  
  carrito: (req, res) => res.render("products/carrito"),
  
  vistaProducto: (req, res) => res.render("products/vistaProducto"),

  create: (req, res) => res.render("products/create"),

  edit: (req, res) => {
		let productId = Number( req.params.id);

		let productToEdit = products.find(product => product.id === productId);
		res.render("edit",{
			productToEdit,
  });
  },

  update: (req, res) => {
    let productId = Number( req.params.id);
    
    products.forEach(product => {
    if (product.id === productId){
      product.name = req.body.name;
      product.price = req.body.price;
      product.discount = req.body.discount;
      product.category = req.body.category;
      product.description = req.body.description;
    }
    });
    writeJson(products);
    res.send('Producto modificado exitosamente.');
  },
}