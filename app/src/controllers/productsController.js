const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products), {encoding: "utf-8"})
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

  detail: (req, res) => {
		let productId = req.params.id;

		let product = products.find(product => product.id == productId);

		res.render("detail", {
			product,
			toThousand
		})

	},

  create: (req, res) => {
      res.render("products/create");
    }, 

<<<<<<< HEAD
  store: (req, res) => {
      const lastId = products[products.length -1].id;
=======
    store: (req, res) => {
      // Do the magic
      const id = Math.max(...products.map(el => el.id))
>>>>>>> b4ba83933a9f88e85d1d94e203fe0660153f6d6f
      
      const newProduct = {
        id: id + 1,
        ...req.body,
        image: 'default-image.png'
      }
      products.push(newProduct);
      writeJson(products)
      res.redirect('products')
    }, 

  edit: (req, res) => {
		let productId = Number( req.params.id);

		let productToEdit = products.find(product => product.id === productId);
		res.render("edit", {
			productToEdit,
    })
  },

  update: (req, res) => {
    let productId = Number(req.params.id);

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

  destroy : (req, res) => {
    // Do the magic:obtener el id del req params
    let productId = Number(req.params.id); /*  */
  
    //Busco el producto eliminar y lo borro del array
    products.forEach( product => {
      if(product.id === productId){
        let productToDestroy = products.indexOf(product);
        products.splice(productToDestroy, 1) 
      }
    })
    writeJson(products)
    
    // retorno un mensaje de exito 
    res.send("El producto fue destruido")
  
    } 
  };




module.exports = controller;