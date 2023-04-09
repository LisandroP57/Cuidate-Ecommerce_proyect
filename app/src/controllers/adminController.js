const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeProductsJson = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products), {encoding: "utf-8"})}
const { validationResult } = require("express-validator");

module.exports = {
    create: (req, res) => {
        return res.render("admin/adminProductCreate", { session: req.session });
    }, 
    
    store: (req, res) => {
        let errors = validationResult(req)
        
        if(errors.isEmpty()){
            
            const id = Math.max(...products.map(el => el.id))
        
            const newProduct = {
            id: id + 1,
            ...req.body,
            image: req.file ? req.file.filename : "default-image.png",
            };

            products.push(newProduct);

            writeProductsJson(products)

            res.redirect('/products/allProducts')
            
        } else {
            res.render("admin/adminProductCreate", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
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
        let errors = validationResult(req);

        if(errors.isEmpty()){
            
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
            res.redirect('/products/allProducts');
        
        } else {
            let productToEdit = products.find(product => product.id === +req.params.id)

            res.render("admin/adminProductEdit", {
                productToEdit,
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
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