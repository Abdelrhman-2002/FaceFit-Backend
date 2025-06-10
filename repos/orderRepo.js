const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Cart = require('../models/Cart');
const mongoose = require('mongoose');

// Create an order
const createOrder = async (orderData) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        // Create the order
        const order = await Order.create([orderData], { session });
        
        // Update customer orders
        await Customer.findByIdAndUpdate(
            orderData.customer,
            { $push: { orders: order[0]._id } },
            { session }
        );
        
        await session.commitTransaction();
        session.endSession();
        
        return await Order.findById(order[0]._id)
            .populate('customer')
            .populate({
                path: 'items.item',
                model: 'Glasses'
            })
            .populate({
                path: 'items.prescription',
                model: 'Prescription'
            });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Order creation failed with error: ", error);
        throw error;
    }
};

// Get order by ID
const getOrderById = async (orderId) => {
    try {
        const order = await Order.findById(orderId)
            .populate('customer')
            .populate({
                path: 'items.item',
                model: 'Glasses'
            })
            .populate({
                path: 'items.prescription',
                model: 'Prescription'
            });
        
        if (!order) {
            throw new Error("Order not found");
        }
        
        return order;
    } catch (error) {
        console.error("Failed to get order:", error);
        throw error;
    }
};

// Get customer orders
const getCustomerOrders = async (customerId) => {
    try {
        const orders = await Order.find({ customer: customerId })
            .populate('customer')
            .populate({
                path: 'items.item',
                model: 'Glasses'
            })
            .populate({
                path: 'items.prescription',
                model: 'Prescription'
            })
            .sort({ date: -1 });
        
        return orders;
    } catch (error) {
        console.error("Failed to get customer orders:", error);
        throw error;
    }
};

// Update order status
const updateOrderStatus = async (orderId, status) => {
    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        )
        .populate('customer')
        .populate({
            path: 'items.item',
            model: 'Glasses'
        })
        .populate({
            path: 'items.prescription',
            model: 'Prescription'
        });
        
        if (!order) {
            throw new Error("Order not found");
        }
        
        return order;
    } catch (error) {
        console.error("Failed to update order status:", error);
        throw error;
    }
};

// Get all orders (admin)
const getAllOrders = async () => {
    try {
        const orders = await Order.find()
            .populate('customer')
            .populate({
                path: 'items.item',
                model: 'Glasses'
            })
            .populate({
                path: 'items.prescription',
                model: 'Prescription'
            })
            .sort({ date: -1 });
        
        return orders;
    } catch (error) {
        console.error("Failed to get all orders:", error);
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