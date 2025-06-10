const express = require("express");
const router = express.Router();
const GlassesController = require("../controllers/glassesController");
const { createGlasses, updateGlasses } = require("../validators/glasses");
const { adminAuth } = require("../middlewares/auth");
const { uploadGlassesImages } = require("../middlewares/upload");

//admin endpoints
router.post("/add", adminAuth, uploadGlassesImages.fields([
    { name: 'images', maxCount: 10 },
    { name: 'modelArmsOBJ', maxCount: 1 },
    { name: 'modelArmsMTL', maxCount: 1 },
    { name: 'modelLensesOBJ', maxCount: 1 },
    { name: 'modelLensesMTL', maxCount: 1 },
    { name: 'modelFrameOBJ', maxCount: 1 },
    { name: 'modelFrameMTL', maxCount: 1 },
    { name: 'modelArmsMaterial', maxCount: 10 },
    { name: 'modelFrameMaterial', maxCount: 10 }
]), createGlasses, GlassesController.addGlasses);

router.put("/update/:id", adminAuth, uploadGlassesImages.fields([
    { name: 'images', maxCount: 10 },
    { name: 'modelArmsOBJ', maxCount: 1 },
    { name: 'modelArmsMTL', maxCount: 1 },
    { name: 'modelLensesOBJ', maxCount: 1 },
    { name: 'modelLensesMTL', maxCount: 1 },
    { name: 'modelFrameOBJ', maxCount: 1 },
    { name: 'modelFrameMTL', maxCount: 1 },
    { name: 'modelArmsMaterial', maxCount: 10 },
    { name: 'modelFrameMaterial', maxCount: 10 }
]), updateGlasses, GlassesController.updateGlasses);
router.delete("/delete/:id", adminAuth, GlassesController.deleteGlasses);

//android endpoints
router.get("/search/", GlassesController.searchGlasses);
router.get("/all", GlassesController.getAllGlasses);
router.get("/bestsellers", GlassesController.getBestSellers);
router.get("/newarrivals", GlassesController.getNewArrivals);
router.get("/try-on", GlassesController.getTryOnGlasses);
router.get("/:id", GlassesController.getGlassesById);

module.exports = router;
