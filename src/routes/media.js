const express = require("express");
const mediaRoutes = express.Router();
const multer = require("multer");
const path = require("path");
const Media = require("../models/media");
const {upload} = require("../helper/helper")



mediaRoutes.get("/image/:name", (req, res) => {
  const {name} = req.params
  console.log(name)
  res.sendFile(path.join(__dirname,`../uploads/images/${name}`));  
});


module.exports = mediaRoutes;
