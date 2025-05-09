const express = require("express");
const router = express.Router();
const { signup, login, getCustomers, updateCustomer, toggleFavorite, getFavorites } = require("../controllers/CustomerController");
const { customerAuth } = require("../middlewares/auth");
const { createCustomer, updateCustomer: validateUpdateCustomer } = require("../validators/Customer");

router.post("/signup", createCustomer, signup);
router.post("/login", login);

router.get("/", getCustomers);

router.put("/update", customerAuth, validateUpdateCustomer, updateCustomer);

//favorites
router.post("/favorites/:glassesId", customerAuth, toggleFavorite);
router.get("/favorites", customerAuth, getFavorites);

module.exports = router;