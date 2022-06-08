const express = require("express");
const mediaRoutes = express.Router();

mediaRoutes.get("/image", (req, res) => {
  res.send("../uploads/images/image1.jpeg");
});

module.exports = mediaRoutes;
