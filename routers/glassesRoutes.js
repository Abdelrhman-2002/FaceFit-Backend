const express = require("express");
const router = express.Router();
const GlassesController = require("../controllers/glassesController");
const { createGlasses, updateGlasses } = require("../validators/Glasses");
const { adminAuth } = require("../middlewares/auth");

//admin endpoints
router.post("/add", adminAuth, createGlasses, GlassesController.addGlasses);
router.put("/update/:id", adminAuth, updateGlasses, GlassesController.updateGlasses);
router.delete("/delete/:id", adminAuth, GlassesController.deleteGlasses);

//android endpoints
router.get("/search/", GlassesController.searchGlasses);
router.get("/all", GlassesController.getAllGlasses);
router.get("/bestsellers", GlassesController.getBestSellers);
router.get("/newarrivals", GlassesController.getNewArrivals);

module.exports = router;
