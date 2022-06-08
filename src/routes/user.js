const express = require("express");
const userRoutes = express.Router();

const userController = require("../controllers/user");
// --------------------------------------------------------------------------------------
userRoutes.post("/user/login", userController.login);
// --------------------------------------------------------------------------------------
userRoutes.post("/user/signup", userController.signup);
userRoutes.get("/user/get", userController.get);
userRoutes.get("/user/getOne/:id", userController.getOne);
userRoutes.patch("/user/patchOne/:id", userController.patchOne);
userRoutes.delete("/user/delOne", userController.delOne);
userRoutes.delete("/user/delOne", userController.delOne);
userRoutes.post("/user/sendResetPassLink", userController.sendResetPassLink);
userRoutes.post("/user/resetPass", userController.resetPass);
userRoutes.post("/user/varifyToken", userController.varifyToken);

module.exports = userRoutes;
