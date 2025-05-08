const customerService = require("../services/customerService");
const jsend = require("jsend");
const { validationResult } = require("express-validator");

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

const getCustomers = (req, res) => {
  res.status(200).send({ message: "List of customers" });
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

module.exports = {
  signup,
  login,
  createCustomer,
  getCustomers,
  updateCustomer,
  toggleFavorite,
  getFavorites,
};
