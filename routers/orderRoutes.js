const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { customerAuth, adminAuth } = require("../middlewares/auth");
const { createOrder, updateOrderStatus } = require("../validators/order");

// Customer order routes
router.post("/checkout", customerAuth, createOrder, orderController.createOrder);
router.get("/", customerAuth, orderController.getCustomerOrders);
router.get("/:orderId", customerAuth, orderController.getOrderById);

// Admin order routes
router.get("/admin/all", adminAuth, orderController.getAllOrders);
router.put("/admin/:orderId/status", adminAuth, updateOrderStatus, orderController.updateOrderStatus);

module.exports = router; 