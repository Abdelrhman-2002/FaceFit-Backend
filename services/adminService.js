const adminRepo = require('../repos/adminRepo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const signup = async (createAdminDto) => {
  try {
    const { password } = createAdminDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    createAdminDto.password = hashedPassword;
    const admin = await adminRepo.createAdmin(createAdminDto);
    const token = jwt.sign(
      { id: admin._id, type: 'admin' },
      config.jwt.adminSecret
    );
    return { admin, token };
  } catch (error) {
    console.error('Error in signup:', error);
    throw error;
  }
}
const login = async (email, password) => {
  try {
    const admin = await adminRepo.getAdminByEmail(email);
    if (!admin) {
      throw new Error('Admin not found');
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ id: admin._id }, config.jwt.adminSecret);
    return { admin, token };
  } catch (error) {
    console.error('Error in login:', error);
    throw error;
  }
};

module.exports = {
    signup,
    login,
};