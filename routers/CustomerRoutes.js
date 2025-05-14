const express = require("express");
const router = express.Router();
const { signup, login, getCustomers, updateCustomer, toggleFavorite, getFavorites, updateProfilePicture } = require("../controllers/CustomerController");
const { customerAuth } = require("../middlewares/auth");
const { createCustomer, updateCustomer: validateUpdateCustomer } = require("../validators/Customer");
const upload = require("../middlewares/upload");
const jsend = require("jsend");

router.post("/signup", createCustomer, signup);
router.post("/login", login);

router.get("/", getCustomers);

router.put("/update", customerAuth, validateUpdateCustomer, updateCustomer);

//favorites
router.post("/favorites/:glassesId", customerAuth, toggleFavorite);
router.get("/favorites", customerAuth, getFavorites);

// Profile picture upload
router.post("/profile-picture", customerAuth, upload.single('profilePicture'), updateProfilePicture);

// Get customer profile
router.get("/profile", customerAuth, async (req, res) => {
  try {
    const customer = await require("../services/customerService").getCustomerById(req.customerId);
    res.send(jsend.success(customer));
  } catch (error) {
    console.log("Error getting profile:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;