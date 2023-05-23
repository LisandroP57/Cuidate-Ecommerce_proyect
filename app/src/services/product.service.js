const { Product } = require("../database/models");

const getProducts = async () => {
  try {
    const products = await Product.findAll({
      include: [
        { association: "images" },
        { association: "subcategory", include: [{ association: "category" }] },
      ],
    });

    return products;
  } catch (error) {
    console.error("Error while fetching products: ", error);
    throw new Error("Error while fetching products");
  }
};

const getProductById = async (productId) => {
  try {
    const product = await Product.findByPk(productId, {
      include: [
        { association: "images" },
        { association: "subcategory", include: [{ association: "category" }] },
      ],
    });

    return product
  } catch (error) {
    console.error("Error while fetching product: ", error);
    throw new Error("Error while fetching product");
  }
};

module.exports = {
    getProducts,
    getProductById
}
