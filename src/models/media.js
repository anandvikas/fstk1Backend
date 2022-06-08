const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true,
  },
});
const Media = new mongoose.model("Media", mediaSchema);
module.exports = Media;
