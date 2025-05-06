const express = require("express");
const router = express.Router();
const GlassesController = require("../controllers/glassesController");
const { createGlasses, updateGlasses } = require("../validators/Glasses");

router.post("/add", createGlasses, GlassesController.addGlasses);
router.put("/update/:id", updateGlasses, GlassesController.updateGlasses);
router.get("/search/", GlassesController.searchGlasses);
router.get("/all", GlassesController.getAllGlasses);
router.get("/bestsellers", GlassesController.getBestSellers);
router.get("/newarrivals", GlassesController.getNewArrivals);
router.delete("delete/:id", GlassesController.deleteGlasses);

module.exports = router;
