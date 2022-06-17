const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      item:{
        type:mongoose.Types.ObjectId,
        ref:'Food'
      }       
    }
  ]
});
const Wishlist = new mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
