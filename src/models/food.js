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
});
const Food = new mongoose.model("Food", foodSchema);
module.exports = Food;
