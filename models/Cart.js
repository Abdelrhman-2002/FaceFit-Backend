const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
    total: { type: Number, required: true }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;