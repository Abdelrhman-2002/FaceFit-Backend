const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true },
    floor: { type: String, required: true },
    apartment: { type: String, required: true },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;