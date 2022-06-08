const express = require("express");
const wishlistRoutes = express.Router();
const wishlistControllers = require("../controllers/wishlist");

wishlistRoutes.post("/wishlist", wishlistControllers.wishlist);
wishlistRoutes.post(
  "/wishlist/addToWishlist",
  wishlistControllers.addToWishlist
);
wishlistRoutes.post(
  "/wishlist/rmFromWishlist",
  wishlistControllers.rmFromWishlist
);
module.exports = wishlistRoutes;
