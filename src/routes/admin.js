const express = require("express");
const adminRoutes = express.Router();

const adminController = require("../controllers/admin");
// --------------------------------------------------------------------------------------
adminRoutes.post("/admin/login", adminController.login);
// --------------------------------------------------------------------------------------
adminRoutes.post("/admin/signup", adminController.signup);
// adminRoutes.get("/admin/get", adminController.get);
// adminRoutes.get("/admin/getOne/:id", adminController.getOne);
// adminRoutes.patch("/admin/patchOne/:id", adminController.patchOne);
// adminRoutes.delete("/admin/delOne", adminController.delOne);

module.exports = adminRoutes;
