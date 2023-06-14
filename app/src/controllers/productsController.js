const { Product, Category, Sequelize, Subcategory, Cart, CartItem } = require("../database/models");
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
	detail: (req, res) => {
		let productId = Number(req.params.id);

		const PRODUCT_PROMISE = Product.findByPk(productId, {
			include: [
				{
					association: "subcategory",
					include: [{ association: "category" }],
				},
				{ association: "images" },
			],
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
					title: `Categoría - ${category.name}`,
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
	
			res.render("products/shoppingcart", {
			  session: req.session,
			  cart,
			  products: products !== undefined ? products : [],
			  user: req.session.user?.id || null,
			});
		  })
		  .catch((error) => console.log(error));
		},
		addToCart: async (req, res) => {
			try {
			  const productId = Number(req.params.id);
			  const userId = req.session.user.id;
			  const cart = await Cart.findOne({ where: { userId } });
		  
			  if (cart) {
				const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
				if (cartItem) {
				  cartItem.quantity += 1;
				  await cartItem.save();
				} else {
				  await CartItem.create({ cartId: cart.id, productId, quantity: 1 });
				}
			  } else {
				const newCart = await Cart.create({ userId, state: "active" });
				await CartItem.create({ cartId: newCart.id, productId, quantity: 1 });
			  }
		  
			  res.redirect("/products/shoppingcart");
			} catch (error) {
			  console.error(error);
			  res.status(500).send('<script>alert("No se pudo agregar el producto al carrito :(");</script>');
			}
		  },
};