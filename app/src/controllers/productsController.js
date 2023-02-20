const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


module.exports = {
  
  carrito: (req, res) => {
    res.render("products/carrito");
  },
  
  vistaProducto: (req, res) => {
    res.render("products/vistaProducto");
  },

  allProducts: (req, res) => {
    let products = products.filter(product => product.category === "visited");
    res.render("products/allProducts", {products});
  },

  create: (req, res) => {
      res.render("products/create");
    },


  edit: (req, res) => {
		let productId = Number( req.params.id);

		let productToEdit = products.find(product => product.id === productId);
		res.render("edit",{
			productToEdit, });
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

  search: (req, res) => {
    return res.send(req.query)
  },
}