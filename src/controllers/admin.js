const bcrypt = require("bcryptjs");
const AdminData = require("../models/admin");

exports.login = async (request, response) => {
  let { body } = request;
  try {
    let res = await AdminData.findOne({ _userName: body.userName });
    if (res) {
      // console.log(res);
      let isMatching = await bcrypt.compare(body.password, res.password);
      // console.log("password matched" + isMatching);
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
exports.signup = async (request, response) => {
  let { body } = request;
  // console.log(body);
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const data = new AdminData({ ...body, password: hashedPassword });

    const res = await AdminData.insertMany([data]);
    // console.log(res);
    response.status(200).send({ userName: res[0].userName, _id: res[0]._id });
  } catch (err) {
    // console.log(err);
    response.status(400).send(err);
  }
};

exports.get = async (request, response) => {
  try {
    let res = await AdminData.find().select({ password: 0 });
    console.log(res);
    response.status(200).send(res);
  } catch (error) {
    console.log(error);
    response.status(400).send(error);
  }
};

exports.getOne = async (request, response) => {
  const { id } = request.params;
  try {
    let res = await AdminData.findOne({ _id: id }).select({ password: 0 });
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.patchOne = async (request, response) => {
  const { id } = request.params;
  const { body } = request;
  try {
    let res = await AdminData.updateOne(
      { _id: id },
      {
        $set: body,
      }
    );
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.delOne = async (request, response) => {
  const { id } = request.body;
  try {
    let res = await AdminData.deleteOne({ _id: id });
    console.log(res);
    response.status(200).send(res);
  } catch (error) {
    console.log(error);
    response.status(400).send(error);
  }
};
