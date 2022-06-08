const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  reviews: [
    {
      userName: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
      },
    },
  ],
});
const Reviews = new mongoose.model("Reviews", reviewsSchema);
module.exports = Reviews;
