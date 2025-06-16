const cartRepo = require('../repos/cartRepo');
const Prescription = require('../models/Prescription');
const Glasses = require('../models/Glasses');
const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
const mongoose = require('mongoose');
const Customer = require('../models/Customer');

// Add item to cart
const addToCart = async (customerId, cartItemData) => {
    try {
        // Check if glasses exists and has sufficient stock
        const glasses = await Glasses.findById(cartItemData.glassesId);
        if (!glasses) {
            throw new Error("Glasses not found");
        }
        
        const requestedQuantity = cartItemData.quantity || 1;
        
        // Get total existing quantity of the same glasses in cart
        const existingQuantity = await getTotalGlassesQuantityInCart(customerId, cartItemData.glassesId);
        const totalQuantity = existingQuantity + requestedQuantity;
        
        // Check if total quantity exceeds available stock
        if (glasses.stock < totalQuantity) {
            throw new Error(`Insufficient stock. Available: ${glasses.stock}, In cart: ${existingQuantity}, Requested: ${requestedQuantity}, Total would be: ${totalQuantity}`);
        }
        
        // Prepare cart item data
        const cartData = {
            quantity: requestedQuantity,
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
        throw handleCartError(error, 'addToCart');
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
        handleCartError(error, 'getCart');
        throw error;
    }
};

// Update cart item
const updateCartItem = async (customerId, cartItemId, updateData) => {
    try {
        // If quantity is being updated, check stock availability
        if (updateData.quantity) {
            // Get the cart item directly to avoid population issues
            const cartItem = await CartItem.findById(cartItemId).populate('item');
            if (!cartItem) {
                throw new Error("Cart item not found");
            }
            
            // Verify this cart item belongs to the customer
            const customer = await Customer.findById(customerId);
            if (!customer || !customer.cart) {
                throw new Error("Customer or cart not found");
            }
            
            const cart = await Cart.findById(customer.cart).populate({
                path: 'items',
                populate: {
                    path: 'item'
                }
            });
            if (!cart || !cart.items.some(item => item._id.toString() === cartItemId)) {
                throw new Error("Cart item not found in customer's cart");
            }
            
            // Check stock availability for the new quantity
            const glasses = cartItem.item;
            if (!glasses) {
                throw new Error("Glasses not found");
            }
            
            // Calculate total quantity of the same glasses in cart (excluding the current item being updated)
            const existingQuantity = cart.items.reduce((total, item) => {
                if (item.item && item.item._id.toString() === glasses._id.toString() && item._id.toString() !== cartItemId) {
                    return total + item.quantity;
                }
                return total;
            }, 0);
            
            const totalQuantity = existingQuantity + updateData.quantity;
            
            if (glasses.stock < totalQuantity) {
                throw new Error(`Insufficient stock. Available: ${glasses.stock}, Other quantities in cart: ${existingQuantity}, Requested: ${updateData.quantity}, Total would be: ${totalQuantity}`);
            }
        }
        
        // Prepare update data
        const updateCartData = {};
        
        if (updateData.quantity) {
            updateCartData.quantity = updateData.quantity;
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
        throw handleCartError(error, 'updateCartItem');
    }
};

// Remove cart item
const removeFromCart = async (customerId, cartItemId) => {
    try {
        return await cartRepo.removeCartItem(customerId, cartItemId);
    } catch (error) {
        throw handleCartError(error, 'removeFromCart');
    }
};

// Clear cart
const clearCart = async (customerId) => {
    try {
        return await cartRepo.clearCart(customerId);
    } catch (error) {
        throw handleCartError(error, 'clearCart');
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

// Validate cart stock before checkout
const validateCartStock = async (customerId) => {
    try {
        const cart = await cartRepo.getCustomerCart(customerId);
        if (!cart || !cart.items || cart.items.length === 0) {
            throw new Error("Cart is empty");
        }
        
        const stockIssues = [];
        
        // Group cart items by glasses ID to check total quantities
        const glassesQuantities = {};
        const glassesInfo = {};
        
        // First pass: collect all cart items and group by glasses ID
        for (const cartItem of cart.items) {
            // Handle cases where item might not be populated or not exist
            if (!cartItem.item || !cartItem.item._id) {
                stockIssues.push({
                    itemId: cartItem._id,
                    itemName: 'Unknown Product',
                    issue: 'Product reference not found'
                });
                continue;
            }
            
            const glassesId = cartItem.item._id.toString();
            
            // Initialize or add to quantity for this glasses
            if (!glassesQuantities[glassesId]) {
                glassesQuantities[glassesId] = 0;
                glassesInfo[glassesId] = {
                    name: cartItem.item.name,
                    cartItems: []
                };
            }
            
            glassesQuantities[glassesId] += cartItem.quantity;
            glassesInfo[glassesId].cartItems.push({
                id: cartItem._id,
                quantity: cartItem.quantity
            });
        }
        
        // Second pass: check stock for each unique glasses
        for (const glassesId in glassesQuantities) {
            const totalQuantity = glassesQuantities[glassesId];
            const info = glassesInfo[glassesId];
            
            const glasses = await Glasses.findById(glassesId);
            if (!glasses) {
                // Add issue for each cart item of this glasses
                info.cartItems.forEach(cartItem => {
                    stockIssues.push({
                        itemId: cartItem.id,
                        itemName: info.name || 'Unknown Product',
                        issue: 'Product not found'
                    });
                });
                continue;
            }
            
            if (glasses.stock < totalQuantity) {
                // Add issue for each cart item of this glasses, but mention total
                info.cartItems.forEach((cartItem, index) => {
                    stockIssues.push({
                        itemId: cartItem.id,
                        itemName: glasses.name,
                        requested: cartItem.quantity,
                        totalRequested: totalQuantity,
                        available: glasses.stock,
                        issue: index === 0 ? 
                            `Insufficient stock (multiple entries of same item: total ${totalQuantity} requested)` : 
                            'Insufficient stock (part of multiple entries)'
                    });
                });
            }
        }
        
        return {
            isValid: stockIssues.length === 0,
            issues: stockIssues
        };
    } catch (error) {
        console.error("Error in validateCartStock:", error);
        throw error;
    }
};

// Helper function to get total quantity of specific glasses in cart
const getTotalGlassesQuantityInCart = async (customerId, glassesId) => {
    try {
        const cart = await cartRepo.getCustomerCart(customerId);
        if (!cart || !cart.items) {
            return 0;
        }
        
        return cart.items.reduce((total, cartItem) => {
            if (cartItem.item && cartItem.item._id.toString() === glassesId) {
                return total + cartItem.quantity;
            }
            return total;
        }, 0);
    } catch (error) {
        console.error("Error getting total glasses quantity in cart:", error);
        return 0;
    }
};

// Enhanced error handling for cart operations
const handleCartError = (error, operation) => {
    console.error(`Error in ${operation}:`, error);
    
    // Check for specific error types and provide user-friendly messages
    if (error.message.includes('Cannot read properties of undefined')) {
        if (error.message.includes('find')) {
            return new Error('Cart data structure error. Please try refreshing your cart.');
        }
        return new Error('Invalid cart data. Please try again.');
    }
    
    if (error.message.includes('Insufficient stock')) {
        return error; // Pass through stock errors as they're already user-friendly
    }
    
    if (error.message.includes('not found')) {
        return error; // Pass through not found errors
    }
    
    if (error.message.includes('Cart is empty')) {
        return error; // Pass through empty cart errors
    }
    
    // Default error message for unexpected errors
    return new Error('An unexpected error occurred. Please try again.');
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    createPrescription,
    getPrescription,
    ensureCart,
    validateCartStock,
    getTotalGlassesQuantityInCart
};
