const reviewRepo= require('../repos/reviewRepo');

const createReview = async (data) => {
    return await reviewRepo.createReview(data);
}
const deleteReview = async (id) => {
    return await reviewRepo.deleteReview(id);
}
const getAllReviews = async (glassesId) => {
    return await reviewRepo.getAllReviews(glassesId);
}

module.exports = {
    createReview,
    deleteReview,
    getAllReviews
};