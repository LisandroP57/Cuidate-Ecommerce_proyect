const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeProductsJson = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products), {encoding: "utf-8"})}
const { validationResult } = require("express-validator");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    products: (req, res) => {
        return res.render("admin/adminProducts",{
            products,
            session: req.session,
			toThousand
		})
	},
    create: (req, res) => {
        return res.render("admin/adminProductCreate", { session: req.session });
    }, 
    
    store: (req, res) => {
        const id = Math.max(...products.map(el => el.id))
        
        const newProduct = {
        id: id + 1,
        ...req.body,
        image: req.file ? req.file.filename : "default-image.png",
        };

        products.push(newProduct);

        writeProductsJson(products)

        res.redirect('/admin/products')
    },  

    edit: (req, res) => {
            let productId = Number(req.params.id);
            let productToEdit = products.find(product => product.id === productId)

            res.render("admin/adminProductEdit", {
                productToEdit,
                session: req.session
            });
    },
    
    update: (req, res) => {
        let productId = Number(req.params.id);

        products.forEach( product => {
        if (product.id === productId){
            product.name = req.body.name;
            product.price = req.body.price;
            product.discount = req.body.discount;
            product.category = req.body.category;
            product.description = req.body.description;
            product.image = req.file ? req.file.filename : product.image;
        }
    });

    writeProductsJson(products);

    res.redirect('/admin/products');
    },

    destroy : (req, res) => {
        let productId = Number(req.params.id);
    
        products.forEach( product => {
        if(product.id === productId){
            let productToDestroy = products.indexOf(product);
            products.splice(productToDestroy, 1) 
        }
        })
        writeProductsJson(products)
        
        res.send("El producto fue destruido")
    }
}