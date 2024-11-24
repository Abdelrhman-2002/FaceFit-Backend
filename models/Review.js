const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    glasses: { type: mongoose.Schema.Types.ObjectId, ref: 'Glasses', required: true },
    rate: { type: Number, required: true },
    comment: { type: String, required: true }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;