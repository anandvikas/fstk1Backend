const mongoose = require("mongoose");

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
});
const AdminData = new mongoose.model("AdminData", mySchema);
module.exports = AdminData;

// "userName":"admin1",
// "email":"admin1@gmail.com",
// "password":"123"
