const bcrypt = require("bcryptjs");
const UserData = require("../models/user");

const signupController = async (request, response) => {
  let { body } = request;
  // console.log(body);
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const data = new UserData({ ...body, password: hashedPassword });

    const res = await UserData.insertMany([data]);
    console.log(res);
    response.status(200).send({ userName: res[0].userName, _id: res[0]._id });
  } catch (err) {
    console.log(err);
    response.status(400).send(err);
  }
};
module.exports = signupController;
