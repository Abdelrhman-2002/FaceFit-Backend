const reviewService = require("../services/reviewService");
const jsend = require("jsend");
const { validationResult } = require("express-validator");
const Review = require("../models/Review");

const createReview = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const reviewData = {
            customerId: req.customerId,
            glassesId: req.body.glassesId,
            rating: req.body.rating,
            comment: req.body.comment,
        };

        const review = await reviewService.createReview(reviewData);
        res.send(jsend.success(review));
    } catch (error) {
        console.log("Error in createReview:", error);
        res.status(500).json({ error: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const { glassesId } = req.params;
        const reviews = await reviewService.getAllReviews(glassesId);
        res.send(jsend.success(reviews));
    } catch (error) {
        console.log("Error in getReviews:", error);
        res.status(500).json({ error: error.message });
    }
}

const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const customerId = req.customerId;
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }
        if (review.customerId.toString() !== customerId) {
            return res.status(403).json({ error: "You are not authorized to delete this review" });
        }

        await reviewService.deleteReview(reviewId);
        res.send(jsend.success({ message: "Review deleted successfully" }));
    } catch (error) {
        console.log("Error in deleteReview:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createReview,
    getReviews,
    deleteReview,
};