const { Product, Category, Sequelize } = require("../database/models");
const { Op } = Sequelize;

module.exports = {
	search: (req, res) => {
		let keywords = req.query.keywords;
		let category = "Resultados para tu busqueda:";
		Product.findAll({
			where: {
				name: { [Op.substring]: keywords },
			},
			include: [{
				association: "subcategory",
				include: [{
					association: "category"
				}] }, {
					association: "images"
				}],
			}).then((products) => {
				return res.render("/products/results",
				{
					products,
					category,
					session: req.session
				});
			});
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
			.then(([product, offerProducts]) => {
				product.images = product.images.map(image => {
					image.image;
					return image;
				});
				res.render("products/detail", {
					offerTitle: "Productos en oferta",
          			offerProducts,
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