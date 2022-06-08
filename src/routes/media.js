const express = require("express");
const mediaRoutes = express.Router();
const multer = require("multer");
const path = require("path");
const Media = require("../models/media");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(req.body);
    callback(null, path.join(__dirname, "../uploads/images"));
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

mediaRoutes.post("/image", upload.single("img"), (req, res) => {
  // console.log(req.file);
  // console.log(req.body.something);

  res.send("uploaded");

  // try {
  //   let media = new Media({
  //     file: req.body.filename.name,
  //   });
  //   let result = await media.save();
  //   res.status(200).send(result);
  // } catch (error) {
  //   console.log(error);
  //   res.status(400).send(error);
  // }
});
// mediaRoutes.get("/image", (req, res) => {
//   res.send("../uploads/images/image1.jpeg");
// });

module.exports = mediaRoutes;
