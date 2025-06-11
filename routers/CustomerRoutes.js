const express = require("express");
const router = express.Router();
const { signup, login, getCustomers, updateCustomer, toggleFavorite, getFavorites, updateProfilePicture, getProfile, getCustomerById, deleteCustomer } = require("../controllers/CustomerController");
const { customerAuth, adminAuth } = require("../middlewares/auth");
const { createCustomer, updateCustomer: validateUpdateCustomer } = require("../validators/Customer");
const { uploadUserPicture } = require("../middlewares/upload");
const jsend = require("jsend");

router.post("/signup", createCustomer, signup);
router.post("/login", login);

router.get("/", adminAuth, getCustomers);
router.get("/:id", adminAuth, getCustomerById);
router.delete("/:id", adminAuth, deleteCustomer);

router.put("/update", customerAuth, validateUpdateCustomer, updateCustomer);
// New endpoint for admin to update a customer
router.put("/update/:id", adminAuth, validateUpdateCustomer, (req, res, next) => {
  req.customerId = req.params.id; // Set the customerId to be used in the updateCustomer controller
  next();
}, updateCustomer);

router.post("/favorites/:glassesId", customerAuth, toggleFavorite);
router.get("/favorites", customerAuth, getFavorites);


router.post("/profile-picture", customerAuth, uploadUserPicture.single('profilePicture'), updateProfilePicture);


router.get("/profile", customerAuth, getProfile);

module.exports = router;