const cartService = require('../services/cartService');
const jsend = require('jsend');
const { validationResult } = require('express-validator');

// Create prescription
const createPrescription = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const prescriptionData = req.body;
        const prescription = await cartService.createPrescription(prescriptionData);
        res.status(201).send(jsend.success(prescription));
    } catch (error) {
        console.log("Error in createPrescription:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get prescription by ID
const getPrescription = async (req, res) => {
    try {
        const prescriptionId = req.params.prescriptionId;
        const prescription = await cartService.getPrescription(prescriptionId);
        res.send(jsend.success(prescription));
    } catch (error) {
        console.log("Error in getPrescription:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPrescription,
    getPrescription
}; 