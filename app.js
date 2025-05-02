const express = require("express");
const config = require("./config/config");
const connectDB = require("./config/db");
const cors = require("cors");
const customerRoutes = require("./routers/CustomerRoutes");

connectDB();

const app = express();
const port = config.port || 3000;

app.use(cors());

app.use(express.json());

app.use("/facefit/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Customer API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
