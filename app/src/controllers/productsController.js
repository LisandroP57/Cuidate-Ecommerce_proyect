const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = (productos) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products) , 'utf-8')
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  
  index: (req, res) => {
		res.render("products",{
			products,
			toThousand
		})
	},

  carrito: (req, res) => {
    res.render("products/carrito");
  },

  
  
  vistaProducto: (req, res) => {
    res.render("products/vistaProducto");
  },

/*   allProducts: (req, res) => {
    let products = products.filter(product => product.category === "visited");
    res.render("products/products", {products});
  }, */

  create: (req, res) => {
      res.render("products/create");
    },

    store: (req, res) => {
      // Do the magic
      const id = Math.max(...products.map(el => el.id))
      
      const newProduct = {
        id: id + 1,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        category: req.body.category,
        description: req.body.description,
        image: 'default-image.png'
      }
  
      products.push(newProduct)
      writeJson(products)
      res.redirect('/products')
    }, 

  edit: (req, res) => {
		let productId = Number( req.params.id);

		let productToEdit = products.find(product => product.id === productId);
		res.render("edit",{
			productToEdit, });
  },

  update: (req, res) => {
    let productId = Number( req.params.id);

    products.forEach(product => {
    if (product.id === productId){
      product.name = req.body.name;
      product.price = req.body.price;
      product.discount = req.body.discount;
      product.category = req.body.category;
      product.description = req.body.description;
    }
    });
    writeJson(products);
    res.send('Producto modificado exitosamente!');
  },

  search: (req, res) => {
    return res.send(req.query)
  },
}

module.exports = controller;