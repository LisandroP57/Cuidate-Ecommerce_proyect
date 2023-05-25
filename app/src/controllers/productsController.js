const { Product, Category, Sequelize, Subcategory, Cart } = require("../database/models");
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
	subcategory: async (req,res) => {
		Subcategory.findByPk(req.params.id, {
		  include: [
			{
			  association: "products",
			  include: [
				{
				  association: "images",
				},
			  ],
			},
		  ],
		})
		  .then((subcategory) => {
			Category.findByPk(subcategory.category_id, {
			  include: [{ association: "subcategories" }],
			}).then((category) =>
			  res.render("subcategory", {
				category,
				products: subcategory.products,
				session: req.session,
				user: req.session.user?.id || null, 
			  })
			);
		  })
		  .catch((err) => console.log(err));
	  },
	  cart: (req, res) => {
		let userId = req.session.user.id;
		Cart.findOne({
		  where: {
			userId: userId
		  },
		  include: [{association: "cartItems", include: [{association: "product", include: [{association: "images"}]}]}]
		})
		  .then((cart) => {
			let products = cart?.cartItems.map((item) => {
			  return {
				product: item.product,
				quantity: item.quantity,
				id: item.id
			  };
			});
	
			res.render("productCart", {
			  session: req.session,
			  cart,
			  products: products !== undefined ? products : [],
			  user: req.session.user?.id || null,
			});
		  })
		  .catch((error) => console.log(error));
	  },
};