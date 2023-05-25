const { getProducts, getProductById } = require("../../services/product.service");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await getProducts();
      const productsResponse = products.map(
        ({ id, name, description, images, subcategory }) => {
          return {
            id, 
            name,
            description,
            images,
            subcategory, 
            detail: `/api/products/${id}`
          };
        }
      );

      const getProductCountByCategory = (products) => {
        const categoryCount = {};

        for (const product of products) {
          const categoryName = product.subcategory.category.name;

          if(categoryCount.hasOwnProperty(categoryName)){
            categoryCount[categoryName]++;
          }else{
            categoryCount[categoryName] = 1;
          }
        }

        return categoryCount;
      }

      const RESPONSE = {
        count: products.length,
        countByCategory: getProductCountByCategory(products),
        products: productsResponse,
      }

      return res.status(200).json(RESPONSE);
    } catch (error) {}
  },
  getProductById: async (req, res) => {
    const PRODUCT_ID = req.params.id;
    const product = await getProductById(PRODUCT_ID);

    return res.status(200).json(product);
  },
  createProduct: async (req, res) => {},
  updateProduct: async (req, res) => {},
  deleteProduct: async (req, res) => {},
};
