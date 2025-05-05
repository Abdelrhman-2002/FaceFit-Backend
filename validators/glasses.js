const { body } = require('express-validator');

const createGlasses = [
    body('name').isString().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price is required'),
    body('stock').isNumeric().withMessage('Stock is required'),
    body('images').isArray().withMessage('Images are required'),
    body('shape').isString().withMessage('Shape is required'),
    body('weight').isNumeric().withMessage('Weight is required'),
    body('size').isString().withMessage('Size is required'),
    body('material').isString().withMessage('Material is required'),
    body('type').isIn(['sunglasses', 'eyeglasses']).withMessage('Type must be either sunglasses or eyeglasses'),
    body('colors').isArray().withMessage('Colors are required'),
    body('gender').isIn(['Men', 'Women']).withMessage('Gender must be either Men or Women')
]

const updateGlasses = [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('stock').optional().isNumeric().withMessage('Stock must be a number'),
    body('images').optional().isArray().withMessage('Images must be an array'),
    body('shape').optional().isString().withMessage('Shape must be a string'),
    body('weight').optional().isNumeric().withMessage('Weight must be a number'),
    body('size').optional().isString().withMessage('Size must be a string'),
    body('material').optional().isString().withMessage('Material must be a string'),
    body('type').optional().isIn(['sunglasses', 'eyeglasses']).withMessage('Type must be either sunglasses or eyeglasses'),
    body('colors').optional().isArray().withMessage('Colors must be an array'),
    body('gender').optional().isIn(['Men', 'Women']).withMessage('Gender must be either Men or Women')
]

module.exports = {
    createGlasses,
    updateGlasses,
};