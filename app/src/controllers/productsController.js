/* const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */
const { Product, Sequelize } = require("../database/models");
const { Op } = Sequelize;
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const controller = {

	products: (req, res) => {
		Product.findAll()
		  .then((products) => {
			res.render("products/allProducts", {
			  products,
			  session: req.session,
			  toThousand
			});
		  })
		  .catch((error) => console.log(error));
		},
	
	carrito: (req, res) => {
		res.render("products/carrito", { session: req.session });
	},

	detail: (req, res) => {
		let productId = Number(req.params.id);
		const PRODUCT_PROMISE = Product.findByPk(productId, {
			include: [{ association: "images" }],
		});
		const ALL_PRODUCTS_PROMISE = Product.findAll({
			where: {
				discount: {
					[Op.gte]: 10,
				},
			},
			include: [{ association: "images" }],
		});
		Promise.all([PRODUCT_PROMISE, ALL_PRODUCTS_PROMISE])
			.then(([product]) => {
				res.render("productDetail", {
					product,
					session: req.session,
					toThousand
				});
			})
			.catch((error) => console.log(error));
	/* let product = products.find(product => product.id == productId); */
			}, 
		};

module.exports = controller;