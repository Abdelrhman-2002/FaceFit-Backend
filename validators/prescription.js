const { body } = require('express-validator');

const createPrescription = [
    body('OS.SPH').isNumeric().withMessage('OS SPH value is required'),
    body('OS.CYL').isNumeric().withMessage('OS CYL value is required'),
    body('OS.AXIS').isNumeric().withMessage('OS AXIS value is required'),
    body('OD.SPH').isNumeric().withMessage('OD SPH value is required'),
    body('OD.CYL').isNumeric().withMessage('OD CYL value is required'),
    body('OD.AXIS').isNumeric().withMessage('OD AXIS value is required'),
    body('PD').custom((value) => {
        if (value.singlePD !== undefined) {
            if (typeof value.singlePD !== 'number') {
                throw new Error('Single PD should be a number');
            }
        } else if (value.dualPD !== undefined) {
            if (typeof value.dualPD.left !== 'number' || typeof value.dualPD.right !== 'number') {
                throw new Error('Dual PD left and right should be numbers');
            }
        } else {
            throw new Error('PD value is required (either singlePD or dualPD)');
        }
        return true;
    })
];

const updatePrescription = [
    body('OS.SPH').optional().isNumeric().withMessage('OS SPH must be a number'),
    body('OS.CYL').optional().isNumeric().withMessage('OS CYL must be a number'),
    body('OS.AXIS').optional().isNumeric().withMessage('OS AXIS must be a number'),
    body('OD.SPH').optional().isNumeric().withMessage('OD SPH must be a number'),
    body('OD.CYL').optional().isNumeric().withMessage('OD CYL must be a number'),
    body('OD.AXIS').optional().isNumeric().withMessage('OD AXIS must be a number'),
    body('PD').optional().custom((value) => {
        if (value.singlePD !== undefined) {
            if (typeof value.singlePD !== 'number') {
                throw new Error('Single PD should be a number');
            }
        } else if (value.dualPD !== undefined) {
            if (typeof value.dualPD.left !== 'number' || typeof value.dualPD.right !== 'number') {
                throw new Error('Dual PD left and right should be numbers');
            }
        } else {
            throw new Error('PD value is required (either singlePD or dualPD)');
        }
        return true;
    })
];

module.exports = {
    createPrescription,
    updatePrescription
}; 