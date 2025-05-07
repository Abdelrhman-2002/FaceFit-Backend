const jwt = require("jsonwebtoken");
const customerService = require("../services/customerService");

const customerAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Token is not provided" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token malformed" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.customerId = decoded.id;

    const customer = await customerService.getCustomerById(req.customerId);
    if (!customer) {
      return res.status(401).json({ error: "Customer not found" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const adminAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Token is not provided" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token malformed" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    req.adminId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = {
  customerAuth,
  adminAuth,
};
