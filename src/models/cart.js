const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      item:{
        type:mongoose.Types.ObjectId,
        ref:'Food'
      },      
      quantity:{
        type:Number,
        required:true
      }
    }
  ],
});
const Cart = new mongoose.model("Cart", cartSchema);
module.exports = Cart;
