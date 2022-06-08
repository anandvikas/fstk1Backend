const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  reviews: {
    type: Object,
  },
});
const Reviews = new mongoose.model("Reviews", reviewsSchema);
module.exports = Reviews;
