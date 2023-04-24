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
        const productId = req.params.id;
        const PRODUCT_PROMISE = Product.findByPk(productId);
        const CATEGORIES_PROMISE = Category.findAll();
        const SUBCATEGORIES_PROMISE = Subcategory.findAll();
        
        Promise.all([PRODUCT_PROMISE, CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE])
        .then(([product, categories, subcategories]) => {
          res.render("admin/adminProductEdit", {
            categories,
            subcategories,
            product,
            session: req.session,
          });
        })
        .catch(error => console.log(error))
    },
    update: (req, res) => {
        let errors = validationResult(req);
        
        if (errors.isEmpty()) {
            const productId = Number(req.params.id);
            
            let { name, price, discount, category, subcategory, description } = req.body;
            
            Product.update(
                {
                    name,
                    price,
                    discount,
                    category,
                    subcategory,
                    description,
                },
                {
                    where: { id: productId }
                })
                .catch(error => {
                    console.log(error);
                });
            } else {
                Product.findOne({
                    where: {
                        id: req.params.id
                    },
                    include: [
                        {
                            association: "subcategory",
                            include: {
                                association: "category",
                            },
                        },
                    ],
                })
                .then(product => {
                    res.render("/", {
                        session: req.session,
                        product,
                    });
                })
                .catch(error => {
                    console.log(error);
                });
            }
    },
    destroy: (req, res) => { //destroy from DB
        
        const productId = req.params.id; //obtengo el id req.params
        
        Product.destroy({
            where: {id:productId}
        })
        .then(()=>{
              return res.redirect("/");
        })
        .catch((error=>console.log(error)))        
    },
}
