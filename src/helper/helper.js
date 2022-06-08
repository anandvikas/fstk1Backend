const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const emailSend = (response, to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASS,
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
  const token = await jwt.sign(data, process.env.JWT_KEY);
  return token;
};

const checkToken = async (token) => {
  const varificationData = await jwt.verify(token, process.env.JWT_KEY);
  return varificationData;
};
module.exports = { emailSend, createToken, checkToken };
