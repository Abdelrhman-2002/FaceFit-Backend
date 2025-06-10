const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true, enum: ["pending", "shipped", "delivered"] },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["credit card", "cash"] },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    deliveryDate: { type: Date },
    cart: { type: [mongoose.Schema.Types.ObjectId], ref: 'Cart' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
