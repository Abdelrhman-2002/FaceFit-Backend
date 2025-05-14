const { body } = require('express-validator');

const addToCart = [
    body('glassesId').isMongoId().withMessage('Valid glasses ID is required'),
    body('size').isString().withMessage('Size is required'),
    body('color').isString().withMessage('Color is required'),
    body('lenseType').isIn(['No-Prescription', 'Prescription']).withMessage('Lense type must be either No-Prescription or Prescription'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('prescriptionId')
        .if(body('lenseType').equals('Prescription'))
        .isMongoId()
        .withMessage('Prescription ID is required for prescription lenses')
];

const updateCartItem = [
    body('cartItemId').isMongoId().withMessage('Valid cart item ID is required'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('size').optional().isString().withMessage('Size must be a string'),
    body('color').optional().isString().withMessage('Color must be a string'),
    body('lenseType').optional().isIn(['No-Prescription', 'Prescription']).withMessage('Lense type must be either No-Prescription or Prescription'),
    body('prescriptionId')
        .if(body('lenseType').equals('Prescription'))
        .isMongoId()
        .withMessage('Prescription ID is required for prescription lenses')
];

module.exports = {
    addToCart,
    updateCartItem
};
