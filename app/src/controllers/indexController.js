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
	search: async (req, res) => {
		try {
			const { keywords } = req.query;
			const results = await Product.find({ name: { $regex: keywords, $options: 'i' } });
			res.render('results', {
				keywords,
				results,
				session: req.session
			});
		} catch
		(error) { console.error(error);
		}
	},
	header: (req, res) => {
		const user = res.locals.user;
		
		res.render("partials/header", {
			session: req.session,
			user: user
		})
	},
}