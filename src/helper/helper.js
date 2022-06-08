const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const emailSend = (response, to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "projectonfloor@gmail.com",
      pass: "ouzmkpqvzmrsobua",
    },
  });

  const mailOptions = {
    from: "projectonfloor@gmail.com",
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, async (err, info) => {
    if (err) {
      console.log(err);
      response.status(200).send({
        success: false,
        message: "Cannot send the reset password link",
      });
    }
  });
};

const createToken = async (data) => {
  const token = await jwt.sign(data, "abcdefghijklmnopqrstuvwxyzabcdef");
  return token;
};

const checkToken = async (token) => {
  const varificationData = await jwt.verify(
    token,
    "abcdefghijklmnopqrstuvwxyzabcdef"
  );
  return varificationData;
};
module.exports = { emailSend, createToken, checkToken };
