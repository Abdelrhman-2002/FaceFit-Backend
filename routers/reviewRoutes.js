const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { createReview } = require("../validators/review");
const { customerAuth } = require("../middlewares/auth");

router.post("/add/", customerAuth, createReview, reviewController.createReview);
router.get("/:glassesId",customerAuth, reviewController.getReviews);
router.delete("/delete/:reviewId", customerAuth, reviewController.deleteReview);

module.exports = router;