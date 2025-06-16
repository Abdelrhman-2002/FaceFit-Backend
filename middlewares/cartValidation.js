const CartItem = require('../models/CartItem');
const Customer = require('../models/Customer');
const Cart = require('../models/Cart');

// Middleware to validate cart item ownership
const validateCartItemOwnership = async (req, res, next) => {
    try {
        const customerId = req.customerId;
        const cartItemId = req.params.cartItemId;
        
        if (!cartItemId) {
            return res.status(400).json({ error: 'Cart item ID is required' });
        }
        
        // Check if cart item exists
        const cartItem = await CartItem.findById(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        
        // Check if customer exists and has a cart
        const customer = await Customer.findById(customerId);
        if (!customer || !customer.cart) {
            return res.status(404).json({ error: 'Customer cart not found' });
        }
        
        // Check if cart exists and contains the cart item
        const cart = await Cart.findById(customer.cart);
        if (!cart || !cart.items.includes(cartItemId)) {
            return res.status(403).json({ error: 'Unauthorized access to cart item' });
        }
        
        // Add validated cart item to request for use in controller
        req.validatedCartItem = cartItem;
        req.validatedCart = cart;
        
        next();
    } catch (error) {
        console.error('Cart item validation error:', error);
        res.status(500).json({ error: 'Internal server error during validation' });
    }
};

module.exports = {
    validateCartItemOwnership
};
