const { Category } = require("../database/models");

const getCategories = async () => {
  return await Category.findAll({
    include: [
      { association: "subcategories", include: [{ association: "products" }] },
    ],
  });
};

const getCategoryById = async (id) => {
  return await Category.findByPk(id, {
    include: [
      { association: "subcategories", include: [{ association: "products" }] },
    ],
  });
};

module.exports = {
  getCategories,
  getCategoryById,
};
