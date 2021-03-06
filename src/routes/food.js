const express = require("express");
const foodRoutes = express.Router();
const foodControllers = require("../controllers/food");
const {upload} = require("../helper/helper")


foodRoutes.get("/food", foodControllers.get);
foodRoutes.post("/food/add", upload.single("img"), foodControllers.add);
foodRoutes.get("/food/getOne/:id", foodControllers.getOne);
foodRoutes.patch("/food/patchOne/:id", foodControllers.patchOne);
foodRoutes.delete("/food/delOne", foodControllers.deleteOne);

module.exports = foodRoutes;
