const mongoose = require('mongoose');

const glassesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: { type: [String], required: true },
    shape: { type: String, required: true},
    weight: { type: Number, required: true },
    size: { type: String, required: true },
    material: { type: String, required: true },
    type: { type: String, enum: ["sunglasses", "eyeglasses"], required: true },
    gender: { type: String, enum:["Men","Women"], required: true },
    colors: { type: [String], required: true },
    numberOfRatings: { type: Number, default:0},
    rate: { type: Number, default:0},
    reviews: { type: [mongoose.Schema.Types.ObjectId], ref: 'Review',default: [] },
    createdAt: { type: Date, default: Date.now },
    numberOfSells: { type: Number, default: 0 }
});

const Glasses = mongoose.model('Glasses', glassesSchema);

module.exports = Glasses;