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
    items: [{ 
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Glasses', required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        lenseType: { type: String, enum: ["No-Prescription", "Prescription"], required: true },
        prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
