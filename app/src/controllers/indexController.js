const { Product } = require("../database/models");

module.exports = {
	index: (req, res) => {
		Product.findAll({
            include: [{association: "images"}]
        })
        .then(products => {
			products = products.map(product => {
				product.images = product.images.map(image => {
					image.image;
					return image;
				});
				return product;
			});
            return res.render("home", {
                offerTitle: "Productos en oferta",
                offerProducts: products,
                session: req.session
            })
        })
        .catch(error => console.log(error));
	},
	search: (req, res) => {
		let { keywords } = req.query
		let results = products.filter(product => product.name.toLowerCase() === keywords.toLowerCase())
		res.render("results", {
			keywords,
			results,
			session: req.session,
		})
	},
};