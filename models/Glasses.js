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
    createdAt: { type: Date, default: Date.now },
    numberOfSells: { type: Number, default: 0 },
    tryOn: { type: Boolean, default: false ,required:true},
    arModels: {
        modelArmsOBJ: { type: String },
        modelArmsMTL: { type: String },
        modelLensesOBJ: { type: String },
        modelLensesMTL: { type: String },
        modelFrameOBJ: { type: String },
        modelFrameMTL: { type: String },
        modelArmsMaterial:{type:[String]},
        modelFrameMaterial:{type:[String]}
    }
});

const Glasses = mongoose.model('Glasses', glassesSchema);

module.exports = Glasses;