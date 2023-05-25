const express = require("express");
const router = express.Router();
const {
  getCarts,
  getCartById,
  getCartByUser,
  addToCart,
  clearCart,
  removeAllFromCart,
  removeOneItemFromCart,
} = require("../../controllers/api/cart.controller");
const verifyToken = require("../../middlewares/jwt.middleware");

router
  .get("/", verifyToken, getCarts)
  .get("/detail/:cartId", verifyToken, getCartById)
  .get("/user", verifyToken, getCartByUser)
  .post("/", verifyToken, addToCart)
  .delete("/clear/:cartId", verifyToken, clearCart)
  .delete("/:itemId", verifyToken, removeAllFromCart)
  .put("/:itemId", verifyToken, removeOneItemFromCart);

module.exports = router;