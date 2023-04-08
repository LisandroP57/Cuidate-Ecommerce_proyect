const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  
  carrito: (req, res) => {
    res.render("products/carrito", { session: req.session });
  },
  detail: (req, res) => {
		let productId = req.params.id;

		let product = products.find(product => product.id == productId);

		res.render("products/detail", {
			product,
      		session: req.session,
			toThousand
		})
	}, 
}

  module.exports = controller;