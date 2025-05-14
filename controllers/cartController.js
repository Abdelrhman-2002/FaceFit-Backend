const cartService = require('../services/cartService');
const jsend = require('jsend');
const { validationResult } = require('express-validator');

// Add to cart
const addToCart = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const customerId = req.customerId;
        const cartItemData = req.body;
        
        const cart = await cartService.addToCart(customerId, cartItemData);
        res.send(jsend.success(cart));
    } catch (error) {
        console.log("Error in addToCart:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get cart
const getCart = async (req, res) => {
    try {
        const customerId = req.customerId;
        
        // Ensure cart exists
        const cart = await cartService.ensureCart(customerId);
        res.send(jsend.success(cart));
    } catch (error) {
        console.log("Error in getCart:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update cart item
const updateCartItem = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const customerId = req.customerId;
        const cartItemId = req.params.cartItemId;
        const updateData = req.body;
        
        const cart = await cartService.updateCartItem(customerId, cartItemId, updateData);
        res.send(jsend.success(cart));
    } catch (error) {
        console.log("Error in updateCartItem:", error);
        res.status(500).json({ error: error.message });
    }
};

// Remove from cart
const removeFromCart = async (req, res) => {
    try {
        const customerId = req.customerId;
        const cartItemId = req.params.cartItemId;
        
        const cart = await cartService.removeFromCart(customerId, cartItemId);
        res.send(jsend.success(cart));
    } catch (error) {
        console.log("Error in removeFromCart:", error);
        res.status(500).json({ error: error.message });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const customerId = req.customerId;
        
        const cart = await cartService.clearCart(customerId);
        res.send(jsend.success(cart));
    } catch (error) {
        console.log("Error in clearCart:", error);
        res.status(500).json({ error: error.message });
    }
};

// Create prescription
const createPrescription = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const prescriptionData = req.body;
        const prescription = await cartService.createPrescription(prescriptionData);
        res.send(jsend.success(prescription));
    } catch (error) {
        console.log("Error in createPrescription:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get prescription
const getPrescription = async (req, res) => {
    try {
        const prescriptionId = req.params.prescriptionId;
        const prescription = await cartService.getPrescription(prescriptionId);
        res.send(jsend.success(prescription));
    } catch (error) {
        console.log("Error in getPrescription:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    createPrescription,
    getPrescription
};
