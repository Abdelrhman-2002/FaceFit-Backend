const customerService = require("../services/customerService");
const jsend = require("jsend");
const { validationResult } = require("express-validator");
const { deleteImageFiles } = require("../middlewares/upload");
const fs = require('fs');
const path = require('path');

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const createCustomerDto = req.body;
    const { customer, token } = await customerService.signup(createCustomerDto);
    res.send(jsend.success({ customer, token }));
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
    const { customer, token } = await customerService.login(email, password);
    res.send(jsend.success({ customer, token }));
  } catch (error) {
    console.log("Error in login:", error);
    res.status(500).json({ error: error.message });
  }
};

const createCustomer = (req, res) => {
  res.status(201).send({ message: "Customer created successfully" });
};

const getCustomers = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const customers = await customerService.getAllCustomers(searchQuery);
    res.send(jsend.success(customers));
  } catch (error) {
    console.log("Error in getCustomers:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customerId = req.customerId;
    const updateData = req.body;
    const updatedCustomer = await customerService.updateCustomer(customerId, updateData);
    res.send(jsend.success(updatedCustomer));
  } catch (error) {
    console.log("Error in updateCustomer:", error);
    res.status(500).json({ error: error.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const customerId = req.customerId;
    const glassesId = req.params.glassesId;
    const result = await customerService.toggleFavorite(customerId, glassesId);
    res.send(jsend.success(result));
  } catch (error) {
    console.log("Error in toggleFavorite:", error);
    res.status(500).json({ error: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const customerId = req.customerId;
    const favorites = await customerService.getFavorites(customerId);
    res.send(jsend.success(favorites));
  } catch (error) {
    console.log("Error in getFavorites:", error);
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const customerId = req.customerId;
    const customer = await customerService.getCustomerById(customerId);
    res.send(jsend.success(customer));
  } catch (error) {
    console.log("Error in getProfile:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    const customerId = req.customerId;
    const profilePicture = req.file.filename;
    
    const updatedCustomer = await customerService.updateCustomer(customerId, { profilePicture });
    
    res.send(jsend.success({
      message: "Profile picture updated successfully",
      profilePicture: updatedCustomer.profilePicture
    }));
  } catch (error) {
    console.log("Error in updateProfilePicture:", error);
    res.status(500).json({ error: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await customerService.getCustomerById(customerId);
    res.send(jsend.success(customer));
  } catch (error) {
    console.log("Error in getCustomerById:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await customerService.getCustomerById(customerId);
    
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    
    // Delete profile picture if it's not the default
    if (customer.profilePicture && customer.profilePicture !== 'default.jpg') {
      const picturePath = path.join(__dirname, '../uploads/usersPictures/', customer.profilePicture);
      if (fs.existsSync(picturePath)) {
        fs.unlinkSync(picturePath);
      }
    }
    
    await customerService.deleteCustomerById(customerId);
    res.send(jsend.success({ message: "Customer deleted successfully" }));
  } catch (error) {
    console.log("Error in deleteCustomer:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
  createCustomer,
  getCustomers,
  updateCustomer,
  toggleFavorite,
  getFavorites,
  updateProfilePicture,
  getProfile,
  getCustomerById,
  deleteCustomer,
};
