const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION,
    adminSecret: process.env.JWT_ADMIN_SECRET,
    adminExpiration: process.env.JWT_ADMIN_EXPIRATION,
  },
};

module.exports = config;
