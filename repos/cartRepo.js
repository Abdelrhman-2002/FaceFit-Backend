const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Customer = require('../models/Customer');
const Glasses = require('../models/Glasses');
const mongoose = require('mongoose');

// Create a new cart
const createCart = async () => {
    try {
        const newCart = await Cart.create({
            items: [],
            total: 0
        });
        return newCart;
    } catch (error) {
        console.error("Cart creation failed with error: ", error);
        throw new Error("An error occurred while creating the cart");
    }
};

// Get customer cart
const getCustomerCart = async (customerId) => {
    try {
        const customer = await Customer.findById(customerId);
        
        if (!customer) {
            throw new Error("Customer not found");
        }
        
        // If customer doesn't have a cart yet
        if (!customer.cart) {
            return null;
        }
        
        // Populate cart with items and their related data
        const cart = await Cart.findById(customer.cart).populate({
            path: 'items',
            populate: [
                { path: 'item' },
                { path: 'prescription' }
            ]
        });
        
        return cart;
    } catch (error) {
        console.error("Failed to get customer cart:", error);
        throw error;
    }
};

// Add item to cart
const addItemToCart = async (customerId, cartItemData) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            throw new Error("Customer not found");
        }
        
        // Get the glasses to validate and get the price
        const glasses = await Glasses.findById(cartItemData.item);
        if (!glasses) {
            throw new Error("Glasses not found");
        }
        
        // Create cart item
        const cartItem = await CartItem.create([{
            quantity: cartItemData.counter || 1,
            item: cartItemData.item,
            size: cartItemData.size,
            price: glasses.price,
            color: cartItemData.color,
            lenseType: cartItemData.lenseType,
            prescription: cartItemData.prescription,
            lensSpecification: cartItemData.lensSpecification,
            lensPrice: cartItemData.lensPrice || 0
        }], { session });
        
        // If customer doesn't have a cart, create one
        let cart;
        // Calculate the item total price including lens price if applicable
        const itemTotalPrice = (glasses.price + (cartItemData.lensPrice || 0)) * (cartItemData.counter || 1);
        
        if (!customer.cart || customer.cart.length === 0) {
            cart = await Cart.create([{
                items: [cartItem[0]._id],
                total: itemTotalPrice
            }], { session });
            
            customer.cart = cart[0]._id;
            await customer.save({ session });
        } else {
            // Add to existing cart
            cart = await Cart.findById(customer.cart);
            if (!cart) {
                throw new Error("Cart not found");
            }
            
            cart.items.push(cartItem[0]._id);
            cart.total += itemTotalPrice;
            await cart.save({ session });
        }
        
        await session.commitTransaction();
        session.endSession();
        
        return await Cart.findById(cart._id).populate({
            path: 'items',
            populate: {
                path: 'item prescription'
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Failed to add item to cart:", error);
        throw error;
    }
};

// Update cart item
const updateCartItem = async (customerId, cartItemId, updateData) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            throw new Error("Customer not found");
        }
        
        const cart = await Cart.findById(customer.cart);
        if (!cart) {
            throw new Error("Cart not found");
        }
        
        // Check if the cart item belongs to the customer's cart
        if (!cart.items.includes(cartItemId)) {
            throw new Error("Cart item not found in customer's cart");
        }
        
        const cartItem = await CartItem.findById(cartItemId).populate('item');
        if (!cartItem) {
            throw new Error("Cart item not found");
        }
        
        // Calculate old total (including lens price)
        const oldTotal = (cartItem.price + (cartItem.lensPrice || 0)) * cartItem.counter;
        
        // Update counter if provided
        if (updateData.counter !== undefined) {
            cartItem.counter = updateData.counter;
        }
        
        // Update other fields if provided
        if (updateData.size !== undefined) {
            cartItem.size = updateData.size;
        }
        
        if (updateData.color !== undefined) {
            cartItem.color = updateData.color;
        }
        
        if (updateData.lenseType !== undefined) {
            cartItem.lenseType = updateData.lenseType;
            
            // If changing from Prescription to No-Prescription, remove prescription but keep lens specification
            if (updateData.lenseType === 'No-Prescription') {
                cartItem.prescription = undefined;
            }
        }
        
        if (updateData.prescription !== undefined) {
            cartItem.prescription = updateData.prescription;
        }
        
        // Update lens specification if provided (now always available)
        if (updateData.lensSpecification !== undefined) {
            cartItem.lensSpecification = updateData.lensSpecification;
            cartItem.lensPrice = updateData.lensSpecification === 'None' ? 0 : 50;
        }
        
        await cartItem.save({ session });
        
        // Calculate new total and update cart (including lens price)
        const newTotal = (cartItem.price + (cartItem.lensPrice || 0)) * cartItem.counter;
        cart.total = cart.total - oldTotal + newTotal;
        await cart.save({ session });
        
        await session.commitTransaction();
        session.endSession();
        
        return await Cart.findById(cart._id).populate({
            path: 'items',
            populate: {
                path: 'item prescription'
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Failed to update cart item:", error);
        throw error;
    }
};

// Remove item from cart
const removeCartItem = async (customerId, cartItemId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            throw new Error("Customer not found");
        }
        
        const cart = await Cart.findById(customer.cart);
        if (!cart) {
            throw new Error("Cart not found");
        }
        
        // Check if the cart item belongs to the customer's cart
        if (!cart.items.includes(cartItemId)) {
            throw new Error("Cart item not found in customer's cart");
        }
        
        const cartItem = await CartItem.findById(cartItemId);
        if (!cartItem) {
            throw new Error("Cart item not found");
        }
        
        // Update cart
        cart.total -= (cartItem.price + (cartItem.lensPrice || 0)) * cartItem.counter;
        cart.items = cart.items.filter(item => item.toString() !== cartItemId.toString());
        await cart.save({ session });
        
        // Delete cart item
        await CartItem.findByIdAndDelete(cartItemId, { session });
        
        await session.commitTransaction();
        session.endSession();
        
        return await Cart.findById(cart._id).populate({
            path: 'items',
            populate: {
                path: 'item prescription'
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Failed to remove cart item:", error);
        throw error;
    }
};

// Clear cart
const clearCart = async (customerId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            throw new Error("Customer not found");
        }
        
        const cart = await Cart.findById(customer.cart);
        if (!cart) {
            throw new Error("Cart not found");
        }
        
        // Delete all cart items
        await CartItem.deleteMany({ _id: { $in: cart.items } }, { session });
        
        // Reset cart
        cart.items = [];
        cart.total = 0;
        await cart.save({ session });
        
        await session.commitTransaction();
        session.endSession();
        
        return cart;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Failed to clear cart:", error);
        throw error;
    }
};

module.exports = {
    createCart,
    getCustomerCart,
    addItemToCart,
    updateCartItem,
    removeCartItem,
    clearCart
};
