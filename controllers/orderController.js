const orderService = require('../services/orderService');
const jsend = require('jsend');
const { validationResult } = require('express-validator');

// Create order (checkout)
const createOrder = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const customerId = req.customerId;
        const orderData = req.body;
        
        // Validate address as a string
        if (!orderData.address || typeof orderData.address !== 'string') {
            return res.status(400).json({ error: "A valid address string is required" });
        }
        
        // If deliveryDate is provided, ensure it's a valid date
        if (orderData.deliveryDate && isNaN(new Date(orderData.deliveryDate).getTime())) {
            return res.status(400).json({ error: "Invalid delivery date format" });
        }
        
        const order = await orderService.createOrder(customerId, orderData);
        res.status(201).send(jsend.success(order));
    } catch (error) {
        console.log("Error in createOrder:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await orderService.getOrderById(orderId);
        
        // Check if order belongs to the customer
        if (order.customer._id.toString() !== req.customerId) {
            return res.status(403).json({ error: "Unauthorized to access this order" });
        }
        
        res.send(jsend.success(order));
    } catch (error) {
        console.log("Error in getOrderById:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get customer orders
const getCustomerOrders = async (req, res) => {
    try {
        const customerId = req.customerId;
        const orders = await orderService.getCustomerOrders(customerId);
        res.send(jsend.success(orders));
    } catch (error) {
        console.log("Error in getCustomerOrders:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update order status (admin)
const updateOrderStatus = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const orderId = req.params.orderId;
        const { status } = req.body;
        
        const order = await orderService.updateOrderStatus(orderId, status);
        res.send(jsend.success(order));
    } catch (error) {
        console.log("Error in updateOrderStatus:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get all orders (admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.send(jsend.success(orders));
    } catch (error) {
        console.log("Error in getAllOrders:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getCustomerOrders,
    updateOrderStatus,
    getAllOrders
}; 