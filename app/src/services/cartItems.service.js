const { CartItem } = require("../database/models");

const getCartItems = async () => {
  try {
    return await CartItem.findAll();
  } catch (error) {
    console.error("Error while fetching order item:", error);
    throw new Error("Error fetching order item");
  }
};

const getCartItemById = async (id) => {
  try {
    return await CartItem.findByPk(id);
  } catch (error) {
    console.error("Error while fetching order item:", error);
    throw new Error("Error fetching order item");
  }
};

const getCartItemsByOrder = async (cartId) => {
  try {
    return await CartItem.findAll({
      where: {
        cartId,
      },
      include: [{ association: "products" }],
    });
  } catch (error) {
    console.error("Error while fetching order item:", error);
    throw new Error("Error fetching order item");
  }
};

const insertCartItem = async (data) => {
  try {
    return await CartItem.create(data);
  } catch (error) {
    console.error("Error while fetching order item:", error);
    throw new Error("Error fetching order item");
  }
};

const updateCartItem = async (data, itemId) => {
  try {
    return await CartItem.update(data, {
      where: {
        id: itemId,
      },
    });
  } catch (error) {
    console.error("Error while updating order item:", error);
    throw new Error("Error updating order item");
  }
};

const deleteCartItem = async (id) => {
  try {
    return await CartItem.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error while deleting order item:", error);
    throw new Error("Error deleting order item");
  }
};

const bulkDeleteCartItems = async (cartId) => {
  try {
    return await CartItem.destroy({
      where: {
        cartId,
      },
    });
  } catch (error) {
    console.error("Error while deleting order items:", error);
    throw new Error("Error deleting order items");
  }
};

module.exports = {
  getCartItems,
  getCartItemById,
  getCartItemsByOrder,
  insertCartItem,
  updateCartItem,
  deleteCartItem,
  bulkDeleteCartItems
};
