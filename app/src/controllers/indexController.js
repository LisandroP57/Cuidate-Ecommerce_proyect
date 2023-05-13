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
                products: products,
                session: req.session
            })
        })
        .catch(error => console.log(error));
	},
	header: (req, res) => {
		const user = res.locals.user;
		
		res.render("partials/header", {
			session: req.session,
			user: user
		})
	},
}