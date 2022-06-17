const bcrypt = require("bcryptjs");
const UserData = require("../models/user");
const Cart = require("../models/cart");
const NewsletterSubscriber = require("../models/newsletterSubscribers");
// const Test = require("../models/test");
const Wishlist = require("../models/wishlist");
const { emailSend, createToken, checkToken } = require("../helper/helper");

exports.login = async (request, response) => {
  let { body } = request;
  // console.log(body);
  try {
    let res = await UserData.findOne({ userName: body.userName });
    if (res) {
      let isMatching = await res.matchPassword(body.password);
      // console.log("password matched" + isMatching);
      if (isMatching) {
        let loginToken = await createToken({
          userName: res.userName,
          _id: res._id,
        });
        response.status(200).send({
          success: true,
          userName: res.userName,
          _id: res._id,
          token: loginToken,
        });
      } else {
        response
          .status(200)
          .send({ success: false, message: "invalid username or password" });
      }
    } else {
      response
        .status(200)
        .send({ success: false, message: "invalid username or password" });
    }
  } catch (err) {
    response.status(200).send({ success: false, message: "Unable to login" });
  }
};

exports.signup = async (request, response) => {
  let { body } = request;
  console.log(body);
  try {    
    const data = new UserData({ ...body });
    const res = await data.save();    
    let cartData = new Cart({
      userId: res._id,
      items: [],
    });
    let wishlistData = new Wishlist({
      userId: res._id,
      items: [],
    });    
    
    await cartData.save();
    await wishlistData.save();    

    if(body.sendMail){
      let subscriber = new NewsletterSubscriber({emailAddress:body.email})
      await subscriber.save()
    }
    
    console.log(res);
    response.status(200).send({ userName: res.userName, _id: res._id });
  } catch (err) {
    console.log(err);
    response.status(400).send(err);
  }
};

exports.varifyToken = async (request, response) => {
  const { token } = request.body;
  try {
    let varificationData = await checkToken(token);
    console.log(varificationData);
    let res = await UserData.find({
      userName: varificationData.userName,
      _id: varificationData._id,
    });
    if (res.length !== 0) {
      response
        .status(200)
        .send({ varified: true, userName: res[0].userName, _id: res[0]._id });
    } else {
      response.status(400).send({ varified: false });
    }
  } catch (error) {
    res.status(400).send({ varified: false });
  }
};

exports.get = async (request, response) => {
  try {
    let res = await UserData.find().select({ password: 0 });
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
    let res = await UserData.findOne({ _id: id }).select({ password: 0 });
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.patchOne = async (request, response) => {
  const { id } = request.params;
  const { body } = request;
  try {
    let res = await UserData.updateOne(
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
    let res = await UserData.deleteOne({ _id: id });
    await Cart.deleteOne({ userId: id });
    await Wishlist.deleteOne({ userId: id });
    console.log(res);
    response.status(200).send(res);
  } catch (error) {
    console.log(error);
    response.status(400).send(error);
  }
};

exports.sendResetPassLink = async (request, response) => {
  const { body } = request;
  let res = await UserData.findOne({ email: body.email });
  if (!res) {
    response.status(200).json({
      success: false,
      message: "this email is not registered",
    });
  } else {
    let to = body.email;
    let subject = "Reset password link";
    let linkToken = await createToken({ email: body.email });
    let html = `<h3>follow the below link to reset the password</h3> <br> <a href="${process.env.FRONTEND_URL}/resetpassword?token=${linkToken}&email=${body.email}" target="_blank">Reset password</a>`;
    emailSend(response, to, subject, html);
    response.status(200).send({
      success: true,
      message: "Reset password link send to the registered email id",
    });
  }
};

exports.resetPass = async (request, response) => {
  const { token, password, email } = request.body;
  try {
    let varificationData = await checkToken(token);
    if (varificationData.email === email) {
      let hashedPassword = await bcrypt.hash(password, 10);
      let res = await UserData.updateOne(
        { email: email },
        { $set: { password: hashedPassword } }
      );
      console.log(res);
      if (res.acknowledged) {
        response.status(200).send({
          success: true,
          message: "Password changed",
        });
      } else {
        response.status(200).send({
          success: false,
          message: "Couldn't change the password",
        });
      }
    } else {
      response.status(200).send({
        success: false,
        message: "Couldn't change the password",
      });
    }
  } catch (error) {
    response.status(200).send({
      success: false,
      message: "Something went wrong",
    });
  }
};
