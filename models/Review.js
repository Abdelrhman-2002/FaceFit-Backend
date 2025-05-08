const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    glassesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Glasses', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;