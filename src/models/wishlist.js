const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
});
const Wishlist = new mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
