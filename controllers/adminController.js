const adminService = require("../services/adminService");
const jsend = require("jsend");
const { validationResult } = require("express-validator");
const Glasses = require("../models/Glasses");
const Order = require("../models/Order");
const Customer = require("../models/Customer");

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const createAdminDto = req.body;
    const { admin, token } = await adminService.signup(createAdminDto);
    res.send(jsend.success({ admin, token }));
  } catch (error) {
    console.log("Error in signup:", error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const { admin, token } = await adminService.login(email, password);
    res.send(jsend.success({ admin, token }));
  } catch (error) {
    console.log("Error in login:", error);
    res.status(500).json({ error: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    // Get counts from database
    const totalProducts = await Glasses.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Calculate total revenue from orders
    const revenueResult = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$total" } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
    
    const stats = {
      totalProducts,
      totalCustomers,
      totalOrders,
      totalRevenue
    };
    
    res.send(jsend.success(stats));
  } catch (error) {
    console.log("Error in getDashboardStats:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    signup,
    login,
    getDashboardStats,
};