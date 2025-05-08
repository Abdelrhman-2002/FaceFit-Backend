const Customer = require("../models/Customer");

const createCustomer = async (createCustomerDto) => {
  try {
    const newCustomer = await Customer.create(createCustomerDto);
    return newCustomer;
  } catch (error) {
    if (error.code === 11000) {
      console.error("Customer creation failed: Duplicate email detected.");
      throw new Error("Email already exists");
    }
    console.error("Customer creation failed with error: ", error);
    throw new Error("An error occurred while creating the customer");
  }
};

const getCustomerByEmail = async (email) => {
  try {
    const customer = await Customer.findOne({ email });
    return customer;
  } catch (error) {
    console.log("Customer Repo ERROR: ", error);
    throw error;
  }
};

const getCustomerById = async (customerId) => {
  try {
    const customer = await Customer.findById(customerId).populate('favorites');
    return customer;
  } catch (error) {
    console.log("Customer Repo ERROR: ", error);
    throw error;
  }
};

const updateCustomerById = async (customerId, updateData) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, updateData, {
      new: true,
      runValidators: true,
    });
    return updatedCustomer;
  } catch (error) {
    console.log("Customer Repo ERROR: ", error);
    throw error;
  }
};

module.exports = {
  createCustomer,
  getCustomerByEmail,
  updateCustomerById,
  getCustomerById,
};
