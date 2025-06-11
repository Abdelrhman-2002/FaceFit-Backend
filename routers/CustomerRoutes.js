const express = require("express");
const router = express.Router();
const { signup, login, getCustomers, updateCustomer, toggleFavorite, getFavorites, updateProfilePicture, getProfile, getCustomerById, deleteCustomer } = require("../controllers/CustomerController");
const { customerAuth, adminAuth } = require("../middlewares/auth");
const { createCustomer, updateCustomer: validateUpdateCustomer } = require("../validators/Customer");
const { uploadUserPicture } = require("../middlewares/upload");
const jsend = require("jsend");

router.post("/signup", createCustomer, signup);
router.post("/login", login);

// Customer-specific routes (must come before /:id to avoid conflicts)
router.get("/favorites", customerAuth, getFavorites);
router.post("/favorites/:glassesId", customerAuth, toggleFavorite);
router.get("/profile", customerAuth, getProfile);
router.post("/profile-picture", customerAuth, uploadUserPicture.single('profilePicture'), updateProfilePicture);
router.put("/update", customerAuth, validateUpdateCustomer, updateCustomer);

// Admin routes
router.get("/", adminAuth, getCustomers);
router.get("/:id", adminAuth, getCustomerById);
router.delete("/:id", adminAuth, deleteCustomer);
// New endpoint for admin to update a customer
router.put("/update/:id", adminAuth, validateUpdateCustomer, (req, res, next) => {
  req.customerId = req.params.id; // Set the customerId to be used in the updateCustomer controller
  next();
}, updateCustomer);

module.exports = router;