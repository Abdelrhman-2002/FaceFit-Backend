const mongoose = require('mongoose');
const Review = require('./Review');
const Prescription = require('./Prescription');

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: {type: String,default:""},
    password: { type: String, required: true },
    profilePicture: { type: String , default : "default.jpg"},
    orders: { type: [mongoose.Schema.Types.ObjectId], ref: 'Order' },
    wishList: { type: [mongoose.Schema.Types.ObjectId], ref: 'Glasses' },
    cart: { type: [mongoose.Schema.Types.ObjectId], ref: 'Glasses' },
    reviews: { type: [mongoose.Schema.Types.ObjectId], ref: 'Review' },
    Prescriptions: { type: [mongoose.Schema.Types.ObjectId], ref: 'Prescription' },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;