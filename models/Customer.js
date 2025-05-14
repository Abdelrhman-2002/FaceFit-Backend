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
    profilePicture: { type: String, default: "default.jpg" },
    orders: { type: [mongoose.Schema.Types.ObjectId], ref: 'Order' },
    cart: { type: [mongoose.Schema.Types.ObjectId], ref: 'Glasses' },
    favorites: { type: [mongoose.Schema.Types.ObjectId], ref: 'Glasses',default: []},
});

// Add a virtual getter for the full profile picture URL
customerSchema.virtual('profilePictureUrl').get(function() {
    return `/uploads/usersPictures/${this.profilePicture}`;
});

// Make virtuals appear in JSON output
customerSchema.set('toJSON', { virtuals: true });
customerSchema.set('toObject', { virtuals: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;