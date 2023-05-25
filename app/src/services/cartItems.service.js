const { CartItem } = require("../database/models");

const getCartsItems = async () => {
  try {
    return await CartItem.findAll();
  } catch (error) {
    console.error("Error while fetching cart item:", error);
    throw new Error("Error fetching cart item");
  }
};

const getCartItemById = async (id) => {
  try {
    return await CartItem.findByPk(id);
  } catch (error) {
    console.error("Error while fetching cart item:", error);
    throw new Error("Error fetching cart item");
  }
};

const getCartItemsByCart = async (cartId) => {
  try {
    return await CartItem.findAll({
      where: {
        cartId,
      },
      include: [{ association: "products" }],
    });
  } catch (error) {
    console.error("Error while fetching cart item:", error);
    throw new Error("Error fetching cart item");
  }
};

const insertCartItem = async (data) => {
  try {
    return await CartItem.create(data);
  } catch (error) {
    console.error("Error while fetching cart item:", error);
    throw new Error("Error fetching cart item");
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
    console.error("Error while updating cart item:", error);
    throw new Error("Error updating cart item");
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
    console.error("Error while deleting cart item:", error);
    throw new Error("Error deleting cart item");
  }
};

const bulkDeleteCartItems = async (CartId) => {
  try {
    return await CartItem.destroy({
      where: {
        cartId,
      },
    });
  } catch (error) {
    console.error("Error while deleting cart items:", error);
    throw new Error("Error deleting cart items");
  }
};

module.exports = {
  getCartsItems,
  getCartItemById,
  getCartItemsByCart,
  insertCartItem,
  updateCartItem,
  deleteCartItem,
  bulkDeleteCartItems
};