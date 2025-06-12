const cartRepo = require('../repos/cartRepo');
const Prescription = require('../models/Prescription');
const Glasses = require('../models/Glasses');
const mongoose = require('mongoose');
const Customer = require('../models/Customer');

// Add item to cart
const addToCart = async (customerId, cartItemData) => {
    try {
        // Prepare cart item data
        const cartData = {
            counter: cartItemData.quantity || 1,
            item: cartItemData.glassesId,
            size: cartItemData.size,
            color: cartItemData.color,
            lenseType: cartItemData.lenseType,
            prescription: cartItemData.lenseType === 'Prescription' ? cartItemData.prescriptionId : null
        };

        // Add lens specification and lens price
        cartData.lensSpecification = cartItemData.lensSpecification || 'None';
        cartData.lensPrice = cartItemData.lensSpecification === 'None' ? 0 : 50;

        return await cartRepo.addItemToCart(customerId, cartData);
    } catch (error) {
        console.error("Error in addToCart:", error);
        throw error;
    }
};

// Get cart
const getCart = async (customerId) => {
    try {
        const cart = await cartRepo.getCustomerCart(customerId);
        
        // If customer doesn't have a cart yet, return null
        if (!cart) {
            return null;
        }
        
        return cart;
    } catch (error) {
        console.error("Error in getCart:", error);
        throw error;
    }
};

// Update cart item
const updateCartItem = async (customerId, cartItemId, updateData) => {
    try {
        // Prepare update data
        const updateCartData = {};
        
        if (updateData.quantity) {
            updateCartData.counter = updateData.quantity;
        }
        
        if (updateData.size) {
            updateCartData.size = updateData.size;
        }
        
        if (updateData.color) {
            updateCartData.color = updateData.color;
        }
        
        if (updateData.lenseType) {
            updateCartData.lenseType = updateData.lenseType;
            
            // If lense type is changed to Prescription, we need a prescription ID
            if (updateData.lenseType === 'Prescription' && updateData.prescriptionId) {
                updateCartData.prescription = updateData.prescriptionId;
            } else if (updateData.lenseType === 'No-Prescription') {
                updateCartData.prescription = null;
            }
        } else if (updateData.prescriptionId && updateData.lenseType === 'Prescription') {
            updateCartData.prescription = updateData.prescriptionId;
        }
        
        // Handle lens specification update
        if (updateData.lensSpecification) {
            updateCartData.lensSpecification = updateData.lensSpecification;
            updateCartData.lensPrice = updateData.lensSpecification === 'None' ? 0 : 50;
        }
        
        return await cartRepo.updateCartItem(customerId, cartItemId, updateCartData);
    } catch (error) {
        console.error("Error in updateCartItem:", error);
        throw error;
    }
};

// Remove cart item
const removeFromCart = async (customerId, cartItemId) => {
    try {
        return await cartRepo.removeCartItem(customerId, cartItemId);
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        throw error;
    }
};

// Clear cart
const clearCart = async (customerId) => {
    try {
        return await cartRepo.clearCart(customerId);
    } catch (error) {
        console.error("Error in clearCart:", error);
        throw error;
    }
};

// Create prescription
const createPrescription = async (prescriptionData) => {
    try {
        const prescription = await Prescription.create(prescriptionData);
        return prescription;
    } catch (error) {
        console.error("Error in createPrescription:", error);
        throw error;
    }
};

// Get prescription by ID
const getPrescription = async (prescriptionId) => {
    try {
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            throw new Error("Prescription not found");
        }
        return prescription;
    } catch (error) {
        console.error("Error in getPrescription:", error);
        throw error;
    }
};

// Ensure customer has a cart
const ensureCart = async (customerId) => {
    try {
        let cart = await cartRepo.getCustomerCart(customerId);
        
        // If cart doesn't exist, create a new one
        if (!cart) {
            const newCart = await cartRepo.createCart();
            
            // Update customer with new cart
            const customer = await Customer.findByIdAndUpdate(
                customerId,
                { cart: newCart._id },
                { new: true }
            );
            
            cart = newCart;
        }
        
        return cart;
    } catch (error) {
        console.error("Error in ensureCart:", error);
        throw error;
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    createPrescription,
    getPrescription,
    ensureCart
};
