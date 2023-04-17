const { validationResult } = require("express-validator");
const {
  Product,
  Category,
  Subcategory,
  ProductImage,
} = require("../database/models");

module.exports = {
    index: (req, res) => {
        return res.render("admin/adminIndex", {
            session: req.session,
        });
    },
    products: (req, res) => {
        Product.findAll({
            include: [
                {
                    association: "subcategory",
                    include: {
                        association: "category",
                },
            },
        ],
    })
    .then((products) => {
        return res.render("admin/adminProducts", {
            session: req.session,
            products,
        });
    })
        .catch((error) => console.log(error))
    },
    create: (req, res) => {
        const CATEGORIES_PROMISE = Category.findAll();
        const SUBCATEGORIES_PROMISE = Subcategory.findAll();

        Promise.all([CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE])
        .then(([categories, subcategories]) => {
            return res.render("admin/adminProductCreate", {
                session: req.session,
                categories,
                subcategories,
            });
        })
        .catch((error) => console.log(error));
    },
    store: (req, res) => {
        let errors = validationResult(req)
        
        if(errors.isEmpty()){
            let {
                name,
                price,
                discount,
                subcategory,
                description
            } = req.body;

            let newProduct = {
                name,
                price,
                description,
                discount,
                subcategory_id: subcategory,
            };

            Product.create(newProduct)
            .then((product) => {
                if (req.files.length === 0) {
                    ProductImage.create({
                        image: "default-image.png",
                        product_id: product.id,
                    })
                    .then(() => {
                        return res.redirect("/products/allProducts")
                    });
                } else {
                    const files = req.files.map((file) => {
                        return {
                            image: file.filename,
                            product_id: product.id,
                        };
                });
                ProductImage.bulkCreate(files)
                .then(() => {
                    return res.redirect("/products/allProducts");
                });
            }
        })
        .catch((error) => console.log(error)); 
        } else {
            const CATEGORIES_PROMISE = Category.findAll();
            const SUBCATEGORIES_PROMISE = Subcategory.findAll();
            
            Promise.all([CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE])
            .then(([categories, subcategories]) => {
                return res.render("admin/adminProductCreate", {
                    session: req.session,
                    categories,
                    subcategories,
                    errors: errors.mapped(),
                    old: req.body,
                });
            })
            .catch((error) => console.log(error));
        }
    },

    edit: (req, res) => {
        const productId = Number(req.params.id);
        Product.findOne({
            where: { id: productId },
            include: [
                {
                    association: "subcategory",
                    include: {
                        association: "category",
                    },
                },
            ],
        })
        .then((product) => {
            if (!product) {
                return res.render("error404"); // producto no encontrado
            }
    
            return res.render("admin/adminProductEdit", {
                session: req.session,
                product,
            });
        })
        .catch((error) => console.log(error))
    },
    
        
    update: (req, res) => {
        let errors = validationResult(req);
    
        if (errors.isEmpty()) {
            const productId = Number(req.params.id);
            let { 
                name, 
                price, 
                discount, 
                category, 
                subcategory, 
                description 
            } = req.body;
    
            Product.findByPk(productId)
            .then((product) => {
                product.name = name;
                product.price = price;
                product.discount = discount;
                product.subcategory_id = subcategory;
                product.description = description;
                product.save()
                .then(() => {
                    res.redirect("/products/allProducts");
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else {
            const productId = Number(req.params.id);
            
            const CATEGORIES_PROMISE = Category.findAll();
            const SUBCATEGORIES_PROMISE = Subcategory.findAll();
    
            Promise.all([CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE])
            .then(([categories, subcategories]) => {
                return res.render("admin/adminProductEdit", {
                    session: req.session,
                    categories,
                    subcategories,
                    errors: errors.mapped(),
                    old: req.body,
                    product: {
                        id: productId,
                        name: req.body.name,
                        price: req.body.price,
                        discount: req.body.discount,
                        subcategory_id: req.body.subcategory,
                        description: req.body.description,
                    }
                });
            })
            .catch((error) => console.log(error));
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