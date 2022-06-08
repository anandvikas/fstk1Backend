const express = require("express");
const reviewsRoutes = express.Router();
const reviewsControllers = require("../controllers/reviews");

reviewsRoutes.post("/reviews", reviewsControllers.reviews);
reviewsRoutes.post("/reviews/addReview", reviewsControllers.addReview);

module.exports = reviewsRoutes;
