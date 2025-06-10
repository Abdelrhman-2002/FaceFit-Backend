const orderRepo = require('../repos/orderRepo');
const cartRepo = require('../repos/cartRepo');
const Order = require('../models/Order');
const mongoose = require('mongoose');

// Create an order (checkout)
const createOrder = async (customerId, orderData) => {
    try {
        // Get customer's cart
        const cart = await cartRepo.getCustomerCart(customerId);
        if (!cart || !cart.items || cart.items.length === 0) {
            throw new Error("Cart is empty");
        }
        
        // Extract cart items data for the order
        const orderItems = cart.items.map(cartItem => ({
            item: cartItem.item._id,
            size: cartItem.size,
            color: cartItem.color,
            lenseType: cartItem.lenseType,
            prescription: cartItem.prescription ? cartItem.prescription._id : null,
            lensSpecification: cartItem.lensSpecification || null,
            lensPrice: cartItem.lensPrice || 0,
            quantity: cartItem.counter,
            price: cartItem.price
        }));
        
        // Create order data
        const newOrderData = {
            customer: customerId,
            date: new Date(),
            status: "pending",
            total: cart.total,
            paymentMethod: orderData.paymentMethod,
            address: orderData.address,
            phone: orderData.phone,
            items: orderItems
        };
        
        // Add deliveryDate only if provided, otherwise leave it undefined (optional field)
        if (orderData.deliveryDate) {
            newOrderData.deliveryDate = orderData.deliveryDate;
        }
        
        // Create order
        const order = await orderRepo.createOrder(newOrderData);
        
        // Clear the cart after successfully creating the order
        await cartRepo.clearCart(customerId);
        
        return order;
    } catch (error) {
        console.error("Error in createOrder:", error);
        throw error;
    }
};

// Get order by ID
const getOrderById = async (orderId) => {
    try {
        return await orderRepo.getOrderById(orderId);
    } catch (error) {
        console.error("Error in getOrderById:", error);
        throw error;
    }
};

// Get customer orders
const getCustomerOrders = async (customerId) => {
    try {
        return await orderRepo.getCustomerOrders(customerId);
    } catch (error) {
        console.error("Error in getCustomerOrders:", error);
        throw error;
    }
};

// Update order status (admin)
const updateOrderStatus = async (orderId, status) => {
    try {
        return await orderRepo.updateOrderStatus(orderId, status);
    } catch (error) {
        console.error("Error in updateOrderStatus:", error);
        throw error;
    }
};

// Get all orders (admin)
const getAllOrders = async () => {
    try {
        return await orderRepo.getAllOrders();
    } catch (error) {
        console.error("Error in getAllOrders:", error);
        throw error;
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getCustomerOrders,
    updateOrderStatus,
    getAllOrders
}; 