const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { createAdmin } = require("../validators/admin");

router.post("/signup", createAdmin, adminController.signup);
router.post("/login", adminController.login);

module.exports = router;
