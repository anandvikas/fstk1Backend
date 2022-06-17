const express = require("express");
const testRoutes = express.Router();
const testControllers = require("../controllers/test");

testRoutes.post("/test", testControllers.test);
testRoutes.post("/test/addToTest", testControllers.addToTest);
module.exports = testRoutes;
