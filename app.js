const express = require("express");
const config = require("./config/config");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const customerRoutes = require("./routers/CustomerRoutes");
const glassesRoutes = require("./routers/glassesRoutes");
const adminRoutes = require("./routers/adminRoutes");
const reviewRoutes = require("./routers/reviewRoutes");
const cartRoutes = require("./routers/cartRoutes");
const orderRoutes = require("./routers/orderRoutes");
const prescriptionRoutes = require("./routers/prescriptionRoutes");
const { swaggerUi, specs } = require('./swagger');

connectDB();

const app = express();
const port = config.port || 3000;


app.use('/uploads', express.static('uploads'));
app.use('/dashboard', express.static('Dashboard'));

app.use(cors());

app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use("/facefit/customers", customerRoutes);
app.use("/facefit/glasses", glassesRoutes);
app.use("/facefit/admin", adminRoutes);
app.use("/facefit/reviews", reviewRoutes);
app.use("/facefit/cart", cartRoutes);
app.use("/facefit/orders", orderRoutes);
app.use("/facefit/prescriptions", prescriptionRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the FaceFit API. Check /api-docs for documentation.");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
});
