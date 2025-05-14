const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { customerAuth } = require("../middlewares/auth");
const { addToCart, updateCartItem } = require("../validators/cart");

// Cart routes
router.post("/add", customerAuth, addToCart, cartController.addToCart);
router.get("/", customerAuth, cartController.getCart);
router.put("/edit/:cartItemId", customerAuth, updateCartItem, cartController.updateCartItem);
router.delete("/delete/:cartItemId", customerAuth, cartController.removeFromCart);
router.delete("/clear", customerAuth, cartController.clearCart);

module.exports = router; 