const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  catagory: {
    type: String,
    required: true,
    enum: ["meal", "snack", "drink"],
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: Object,
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  images: [
    {
      src: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        required: true,
      },
    },
  ],
  addedOn:{
    type:Date,
    default:Date.now
  },
  avgRating:{
    type:Number,
    default:5
  }
});
const Food = new mongoose.model("Food", foodSchema);
module.exports = Food;
