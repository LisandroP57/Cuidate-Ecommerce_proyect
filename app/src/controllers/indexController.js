const fs = require('fs');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
	index: (req, res) => {
		getProductData()
			.then((products) => {
				const productsInSale = products.filter(product => product.Category.name === "in-sale");
				const productsVisited = products.filter(product => product.Category.name === "visited");
				res.render('home',{
					productsVisited,
					productsInSale,
					session: req.session,
					toThousand
				});
			})
			.catch((error) => console.log(error));
	},
	search: (req, res) => {
		let { keywords } = req.query
		let results = products.filter(product => product.name.toLowerCase() === keywords.toLowerCase())
		res.render("results", {
			keywords,
			results,
			session: req.session,
			toThousand,
		})
	},
};