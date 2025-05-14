const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true, enum: ["pending", "shipped", "delivered"] },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["credit card", "cash"] },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    phone: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    cart: { type: [mongoose.Schema.Types.ObjectId], ref: 'Cart' },
    Prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
