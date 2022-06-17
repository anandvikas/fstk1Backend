const mongoose = require("mongoose");

const nlSchema = new mongoose.Schema({
  emailAddress:{
      type:String,
      required:true
  }
});
const NewsletterSubscriber = new mongoose.model("NewsletterSubscriber", nlSchema);
module.exports = NewsletterSubscriber;
