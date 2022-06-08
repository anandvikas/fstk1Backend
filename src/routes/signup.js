const express = require("express");
const signupController = require("../controllers/signup");
// --------------------------------------------------------------------------------------
const signupRoute = express.Router();

// --------------------------------------------------------------------------------------
signupRoute.post("/signup", signupController);
module.exports = signupRoute;
