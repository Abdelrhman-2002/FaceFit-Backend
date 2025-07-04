const customerRepo = require("../repos/CustomerRepo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");

const signup = async (createCustomerDto) => {
  try {
    const { password } = createCustomerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    createCustomerDto.password = hashedPassword;
    const customer = await customerRepo.createCustomer(createCustomerDto);
    const token = jwt.sign(
      { id: customer._id, type: "customer" },
      config.jwt.secret
    );
    return { customer, token };
  } catch (error) {
    console.error("Error in signup:", error);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const customer = await customerRepo.getCustomerByEmail(email);
    if (!customer) {
      throw new Error("Customer not found");
    }
    const isPasswordCorrect = await bcrypt.compare(password, customer.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign({ id: customer._id }, config.jwt.secret);
    return { customer, token };
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

const updateCustomer = async (customerId, updateData) => {
  try {
    const updatedCustomer = await customerRepo.updateCustomerById(customerId, updateData);
    if (!updatedCustomer) {
      throw new Error("Customer not found");
    }
    return updatedCustomer;
  } catch (error) {
    console.error("Error in updateCustomer:", error);
    throw error;
  }
};

const getCustomerById = async (customerId) => {
  try {
    const customer = await customerRepo.getCustomerById(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  } catch (error) {
    console.error("Error in getCustomerById:", error);
    throw error;
  }
};

const toggleFavorite = async (customerId, glassesId) => {
  try {
    const customer = await customerRepo.getCustomerById(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    const favorites = customer.favorites || [];
    const index = favorites.findIndex(fav => fav._id.toString() === glassesId);

    if (index !== -1) {
      // Remove from favorites
      favorites.splice(index, 1);
    } else {
      // Add to favorites
      favorites.push(glassesId);
    }

    const updatedCustomer = await customerRepo.updateCustomerById(customerId, { favorites });
    return {
      message: index !== -1 ? "Removed from favorites" : "Added to favorites",
      favorites: updatedCustomer.favorites
    };
  } catch (error) {
    console.error("Error in toggleFavorite:", error);
    throw error;
  }
};

const getFavorites = async (customerId) => {
  try {
    const customer = await customerRepo.getCustomerById(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer.favorites;
  } catch (error) {
    console.error("Error in getFavorites:", error);
    throw error;
  }
};

const getAllCustomers = async (searchQuery) => {
  try {
    const customers = await customerRepo.getAllCustomers(searchQuery);
    return customers;
  } catch (error) {
    console.error("Error in getAllCustomers:", error);
    throw error;
  }
};

const deleteCustomerById = async (customerId) => {
  try {
    const deletedCustomer = await customerRepo.deleteCustomerById(customerId);
    if (!deletedCustomer) {
      throw new Error("Customer not found");
    }
    return deletedCustomer;
  } catch (error) {
    console.error("Error in deleteCustomerById:", error);
    throw error;
  }
};

module.exports = {
  signup,
  login,
  updateCustomer,
  getCustomerById,
  getAllCustomers,
  toggleFavorite,
  getFavorites,
  deleteCustomerById,
};
