const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { createAdmin } = require("../validators/admin");
const { adminAuth } = require("../middlewares/auth");

router.post("/signup", createAdmin, adminController.signup);
router.post("/login", adminController.login);
router.get("/stats", adminAuth, adminController.getDashboardStats);

module.exports = router;
