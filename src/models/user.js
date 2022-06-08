const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const mySchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  sendMail: {
    type: Boolean,
  },
  sendText: {
    type: Boolean,
  },
});

// this will hash the password before saving
mySchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// this will compare the entered password with hashed password
mySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserData = new mongoose.model("UserData", mySchema);
module.exports = UserData;
