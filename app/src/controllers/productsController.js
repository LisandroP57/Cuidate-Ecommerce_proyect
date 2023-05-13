const { Product, Category, Sequelize } = require("../database/models");
const { Op } = Sequelize;

module.exports = {
	search: async (req, res) => {
		const { keywords } = req.query;
		try {
			const products = await Product.findAll({
				include: [{association: "images"}],
				where: {
					name: {[Op.like]: `%${keywords}%`}
				}
			});
				res.render('products/results', {
					products,
					keywords,
					session: req.session,
				});
			} catch (error) { console.error(error); }
	},
	shoppingcart: (req, res) => {
		res.render("products/shoppingcart", { session: req.session });
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
			.then(([product, products]) => {
				product.images = product.images.map(image => {
					image.image;
					return image;
				});
				res.render("products/detail", {
					products,
					product,
					session: req.session
				});
			})
			.catch((error) => console.log(error));
	},
	category: (req, res) => {
		const categoryId = req.params.id;
		
		Category.findByPk(categoryId, {
			include: [
				{
					association: "subcategories",
					include: {
						association: "products",
						include: { association: "images" },
					},
				},
			],
		})
		.then((category) => {
			const PRODUCTS = category.subcategories.map(
				(subcategory) => subcategory.products
				);
				return res.render("products/categories", {
					category,
					subcategories: category.subcategories,
					products: PRODUCTS.flat(),
					session: req.session
				});
			})
			.catch((error) => console.log(error));
	},
};