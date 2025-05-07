const Admin= require("../models/Admin");

const createAdmin = async (adminData) => {
    try {
        const newAdmin = await Admin.create(adminData);
        return newAdmin;
    } catch (error) {
        if (error.code === 11000) {
        console.error("Admin creation failed: Duplicate email detected.");
        throw new Error("Email already exists");
        }
        console.error("Admin creation failed with error: ", error);
        throw new Error("An error occurred while creating the admin");
    }
};

const getAdminByEmail = async (email) => {
    try {
        const admin = await Admin.find
        .findOne({ email });
        return admin;
    }
    catch (error) {
        console.log("Admin Repo ERROR: ", error);
        throw error;
    }
}
const getAdminById = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId);
        return admin;
    } catch (error) {
        console.log("Admin Repo ERROR: ", error);
        throw error;
    }
};

module.exports = {
    createAdmin,
    getAdminByEmail,
    getAdminById,
};