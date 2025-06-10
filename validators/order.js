const { body } = require('express-validator');

const createOrder = [
    body('address').isString().notEmpty().withMessage('Valid address is required'),
    body('phone').isMobilePhone('any').withMessage('Valid phone number is required'),
    body('paymentMethod').isIn(['cash']).withMessage('Payment method must be cash'),
    body('deliveryDate').optional().isISO8601().withMessage('Delivery date must be a valid date format')
];

const updateOrderStatus = [
    body('status').isIn(['pending', 'shipped', 'delivered']).withMessage('Status must be pending, shipped, or delivered')
];

module.exports = {
    createOrder,
    updateOrderStatus
}; 