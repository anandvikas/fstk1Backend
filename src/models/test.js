const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
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
const Test = new mongoose.model("Test", testSchema);
module.exports = Test;
