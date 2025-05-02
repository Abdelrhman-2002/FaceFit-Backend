const express = require("express");
const router = express.Router();
const { signup, login, getCustomers, updateCustomer } = require("../controllers/CustomerController");
const { customerAuth } = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);

router.get("/", getCustomers);

router.put("/update", customerAuth, updateCustomer);

module.exports = router;
