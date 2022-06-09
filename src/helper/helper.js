const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
//---------------------------------------------------------------
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

//---------------------------------------------------------------
const createToken = async (data) => {
  const token = await jwt.sign(data, process.env.JWT_KEY);
  return token;
};

const checkToken = async (token) => {
  const varificationData = await jwt.verify(token, process.env.JWT_KEY);
  return varificationData;
};

//---------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // console.log(req.body);
    callback(null, path.join(__dirname, "../uploads/images"));
  },
  filename: (req, file, callback) => {
    // console.log(file);
    callback(null, `${new Date().getFullYear()}_${new Date().getMonth()}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });


module.exports = { emailSend, createToken, checkToken, upload };
