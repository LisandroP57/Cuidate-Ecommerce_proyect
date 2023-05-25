const { Cart } = require("../database/models");

const getCarts = async () => {
  return await Cart.findAll();
};

const getCartById = async (id) => {
  return await Cart.findByPk(id);
};

const getCartByUser = (userId) => {
  return Cart.findOne({
    where: {
      userId,
    },
    include: [
      { association: "cartItems", include: [{ association: "products" }] },
    ],
  });
};

const insertCart = async (data) => {
    try {
        return await Cart.create(data);
    } catch (error) {
        console.error("Error while fetching cart :", error);
        throw new Error("Error fetching cart ");
    }
};

const updateCart = async (data, Id) => {
    try {
        return await Cart.create(data, {
            where: {
                id: Id
            }
        });
    } catch (error) {
        console.error("Error while fetching cart :", error);
        throw new Error("Error fetching cart ");
    }
};

const deleteCart = async (id) => {
    try {
        return await Cart.destroy({
            where: {
                id
            }
        });
    } catch (error) {
        console.error("Error while fetching cart :", error);
        throw new Error("Error fetching cart ");
    }
};

module.exports = {
  getCarts,
  getCartById,
  getCartByUser,
  insertCart,
  updateCart,
  deleteCart
};