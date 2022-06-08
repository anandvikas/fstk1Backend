const bcrypt = require("bcryptjs");
const UserData = require("../models/user");

const loginController = async (request, response) => {
  let { body } = request;
  try {
    let res = await UserData.findOne({ _userName: body.userName });
    if (res) {
      // console.log(res);
      let isMatching = await bcrypt.compare(body.password, res.password);
      console.log("password matched" + isMatching);
      if (isMatching) {
        response.status(200).send({ userName: res.userName, _id: res._id });
      } else {
        response.status(400).send("invalid username or password");
      }
    } else {
      response.status(400).send("invalid username or password");
    }
  } catch (err) {
    response.status(400).send(err);
  }
};

module.exports = loginController;
