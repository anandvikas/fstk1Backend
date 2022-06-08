const express = require("express");
const cartRoutes = express.Router();
const cartControllers = require("../controllers/cart");

cartRoutes.post("/cart", cartControllers.cart);
cartRoutes.post("/cart/addToCart", cartControllers.addToCart);
cartRoutes.post("/cart/rmFromCart", cartControllers.rmFromCart);
cartRoutes.post("/cart/changeCount", cartControllers.changeCount);
module.exports = cartRoutes;
