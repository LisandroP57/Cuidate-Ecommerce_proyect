const { Product } = require("../database/models");

module.exports = {

	index: (req, res) => {
		Product.findAll({
            include: [{association: "images"}]
        })
        .then(products => {
            return res.render("home", {
                sliderTitle: "Productos en oferta",
                sliderProducts: products,
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