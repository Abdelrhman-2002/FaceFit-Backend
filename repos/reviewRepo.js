const Review = require('../models/Review');

const createReview = async (reviewData) => {
    try {
        const { customerId, glassesId, rating, comment } = reviewData;
        const newReview = await Review.create({ customerId, glassesId, rating, comment });
        return newReview;
    } catch (error) {
        console.error("Error creating review: ", error);
        throw new Error("An error occurred while creating the review");
    }
};

const deleteReview = async (reviewId) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            throw new Error("Review not found");
        }
        return deletedReview;
    } catch (error) {
        console.error("Error deleting review: ", error);
        throw new Error("An error occurred while deleting the review");
    }
}

const getAllReviews = async (glassesId) => {
    try {
        const reviews = await Review.find({ glassesId }).populate('customerId', 'firstName lastName email');
        return reviews;
    } catch (error) {
        console.error("Error fetching reviews: ", error);
        throw new Error("An error occurred while fetching the reviews");
    }
}


module.exports = {
    createReview,
    deleteReview,
    getAllReviews
};