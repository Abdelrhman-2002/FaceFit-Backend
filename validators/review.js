const {body} = require('express-validator');

const createReview = [
    body('customerId').isString().withMessage('Customer ID is required'),
    body('glassesId').isString().withMessage('Glasses ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().isString().withMessage('Comment must be a string')
];

module.exports = {
    createReview,
};