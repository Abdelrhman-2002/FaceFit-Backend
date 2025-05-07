const {body} = require('express-validator');

const createAdmin = [
    body('firstName').isString().withMessage('First name is required'),
    body('lastName').isString().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
        .isLength({min: 8}).withMessage('Password should be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[\W_]/).withMessage('Password must contain at least one special character'),
    body("phoneNumber")
        .isMobilePhone('any').withMessage("Please provide a valid phone number"),
    body('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    })
]

module.exports = {
    createAdmin,
};