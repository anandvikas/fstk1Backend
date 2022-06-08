const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
});
const Cart = new mongoose.model("Cart", cartSchema);
module.exports = Cart;
