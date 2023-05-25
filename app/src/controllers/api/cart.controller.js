const {
    deleteCart,
    getCartById,
    getCartByUser,
    getCarts,
    insertCart,
    updateCart,
  } = require("../../services/cart.service");
  const {
    deleteCartItem,
    getCartItemById,
    getCartItemsByCart,
    getCartsItems,
    insertCartItem,
    updateCartItem,
    bulkDeleteCartItems,
  } = require("../../services/cartItems.service");
  
  module.exports = {
    getCarts: async (req, res) => {
      try {
        const carts = await getCarts();
        const RESPONSE = {
          count: carts.length,
          carts,
        };
        return res.status(200).json(RESPONSE);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
    },
    getCartById: async (req, res) => {
      try {
        const CART_ID = req.params.cartId;
        const cart = await getCartById(CART_ID);
        return res.status(200).json(cart);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
    },
    getCartByUser: async (req, res) => {
      try {
        const { id } = req.user;
        const cart = await getCartByUser(id);
  
        let response;
  
        if (Cart) {
          return res.status(200).json(cart);
        } else {
          response = `El usuario ${id} no tiene carrito creada`;
          return res.status(400).json(response);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
    },
    addToCart: async (req, res) => {
      try {
        const { id: userId } = req.user;
        const cart = await getCartByUser(userId);
  
        const { productId, quantity } = req.body;
  
        if (cart) {
          const { id } = cart;
          let cartItemData;
          const itemsFromCart = await getCartItemsByCart(id);
          const itemToAdd = itemsFromCart?.find(
            (item) => item.productId === productId
          );
  
          if (itemToAdd) {
            cartItemData = {
              productId: itemToAdd.productId,
              cartId: itemToAdd.cartId,
              quantity: itemToAdd.quantity + 1,
            };
  
            const updateCartItemFetch = await updateCartItem(
              cartItemData,
              itemToAdd.id
            );
  
            return res.status(200).json("Producto modificado");
          } else {
            cartItemData = {
              productId,
              cartId: id,
              quantity: 1,
            };
  
            const createCartItemInCart = await insertCartItem(cartItemData);
  
            return res.status(201).json("Producto Agregado");
          }
        } else {
          const data = {
            userId: userId,
            state: "PENDIENTE",
          };
          const createdCart = await insertCart(data);
          let cartItemData = {
            productId,
            cartId: createdCart.id,
            quantity: 1,
          };
          const createCartItemInCart = await insertCartItem(cartItemData);
  
          res.status(201).json("Carrito creada, e item agregado");
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
    },
    removeOneItemFromCart: async (req, res) => {
      try {
        const { itemId } = req.params;
  
        const item = await getCartItemById(itemId);
  
        if (!item) return res.status(400).json(`El item ${itemId} no existe`);
  
        if (item.quantity > 1) {
          const updatedItem = {
            ...item,
            quantity: item.quantity - 1,
          };
  
          const updateItemResult = await updateCartItem(updatedItem, itemId);
  
          return updateItemResult
            ? res.status(200).json("Item actualizado correctamente")
            : res.status(400).json("Hubo un problema al actualizar el item");
        }
  
        if (item.quantity === 1) {
          const itemDeleteResult = await deleteCartItem(itemId);
          const itemsCart = await getCartItemsByCart(item.cartId);
  
          const cartHaveMoreItems = itemsCart.length > 0;
  
          if (!cartHaveMoreItems) {
            const cartDeleteResult = await deleteCart(item.cartId);
  
            return itemDeleteResult && cartDeleteResult
              ? res.status(200).json("Item y carrito eliminados correctamente")
              : res
                  .status(400)
                  .json("Hubo un problema al eliminar el item ol carrito");
          }
  
          return itemDeleteResult
            ? res.status(200).json("Item eliminado correctamente")
            : res.status(400).json("Hubo un problema al eliminar el item");
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
    },
    removeAllFromCart: async (req, res) => {
      try {
        const { itemId } = req.params;
  
        const item = await getCartItemById(itemId);
  
        if (!item) return res.status(400).json(`El item ${itemId} no existe`);
  
        const itemsCart = await getCartItemsByCart(item.cartId);
  
        const cartHaveMoreOfOneItem = itemsCart.length > 1;
  
        const itemDeleteResult = await deleteCartItem(itemId);
  
        if (cartHaveMoreOfOneItem) {
          return itemDeleteResult
            ? res.status(200).json("Item eliminado correctamente")
            : res.status(400).json("Hubo un problema al querer eliminar el item");
        } else {
          const cartDeleteResult = await deleteCart(item.cartId);
          return itemDeleteResult && cartDeleteResult
            ? res.status(200).json("Item y carrito eliminados correctamente")
            : res
                .status(400)
                .json("Hubo un problema al querer eliminar el item o la orden");
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
    },
    clearCart: async (req, res) => {
      try {
        const { cartId } = req.params;
        const itemsDeleteResult = await bulkDeleteCartItems(cartId);
        const cartDeleteResult = await deleteCart(cartId);
  
        return itemsDeleteResult && cartDeleteResult
          ? res.status(200).json("Carrito eliminada correctamente")
          : res.status(400).json("Hubo un error al eliminar el carrito");
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
    },
  };
  