const fs = require('fs');
const path = require('path');

const { validationResult } = require("express-validator")
const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products), {encoding: "utf-8"})
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  
  index: (req, res) => {
		res.render("products/products",{
			products,
      session: req.session,
			toThousand
		})
	},

  carrito: (req, res) => {
    res.render("products/carrito", { session: req.session });
  },

  detail: (req, res) => {
		let productId = req.params.id;

		let product = products.find(product => product.id == productId);

		res.render("products/detail", {
			product,
      session: req.session,
			toThousand
		})

	},

  create: (req, res) => {
      res.render("products/create", { session: req.session });
    }, 

    store: (req, res) => {
      
      const id = Math.max(...products.map(el => el.id))
      
      const newProduct = {
        id: id + 1,
        ...req.body,
        image: req.file ? req.file.filename : "default-image.png",
      };
      products.push(newProduct);
      writeJson(products)
      res.redirect('products')
    },  

  edit: (req, res) => {
		let productId = Number(req.params.id);
		let productToEdit = products.find((product) => {
      return product.id === productId;
    });
		res.render("products/edit", { productToEdit, session: req.session });
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
        product.image = req.file ? req.file.filename : product.image;
      }
    }),
    writeJson(products);
    res.redirect('/');
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