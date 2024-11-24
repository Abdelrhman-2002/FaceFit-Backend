const mongoose = require('mongoose');

const glassesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    colors: { type: [String], required: true },
    stock: { type: Number, required: true },
    images: { type: [String], required: true },
    shape: { type: String, required: true},
    sizes: { type: [String], required: true },
    type: { type: String, enum:  ["sunglasses", "eyeglasses"], required: true },
    numberOfRatings: { type: Number, required: true },
    rate: { type: Number, required: true },
    reviews: { type: [mongoose.Schema.Types.ObjectId], ref: 'Review' },
    
});

const Glasses = mongoose.model('Glasses', glassesSchema);

module.exports = Glasses;