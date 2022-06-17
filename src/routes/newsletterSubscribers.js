const express = require("express");
const nlsRoutes = express.Router();
const nlsController = require("../controllers/newsletterSubscribers");

nlsRoutes.post("/nlSubscriber/add", nlsController.add);

module.exports = nlsRoutes;
