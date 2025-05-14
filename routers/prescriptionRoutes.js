const express = require("express");
const router = express.Router();
const prescriptionController = require("../controllers/prescriptionController");
const { customerAuth } = require("../middlewares/auth");
const { createPrescription, updatePrescription } = require("../validators/prescription");

// Prescription routes
router.post("/", customerAuth, createPrescription, prescriptionController.createPrescription);
router.get("/:prescriptionId", customerAuth, prescriptionController.getPrescription);

module.exports = router; 