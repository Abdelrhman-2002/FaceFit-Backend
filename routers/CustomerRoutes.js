const express = require("express");
const router = express.Router();
const { signup, login, getCustomers, updateCustomer, toggleFavorite, getFavorites, updateProfilePicture, getProfile } = require("../controllers/CustomerController");
const { customerAuth } = require("../middlewares/auth");
const { createCustomer, updateCustomer: validateUpdateCustomer } = require("../validators/Customer");
const upload = require("../middlewares/upload");
const jsend = require("jsend");

router.post("/signup", createCustomer, signup);
router.post("/login", login);

router.get("/", getCustomers);

router.put("/update", customerAuth, validateUpdateCustomer, updateCustomer);

router.post("/favorites/:glassesId", customerAuth, toggleFavorite);
router.get("/favorites", customerAuth, getFavorites);


router.post("/profile-picture", customerAuth, upload.single('profilePicture'), updateProfilePicture);


router.get("/profile", customerAuth, getProfile);

module.exports = router;