const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const emailValidation = require("../helpers/emailValidation.js");
const nodemailer = require("nodemailer");
const forgotPasswordLink = require("../helpers/forgotPAsswordLink.js")

let forgotPasswordController = async (req, res) => {
    const { email } = req.body;

    let duplicateEmail = await User.find({ email: email });

    if (duplicateEmail.length == 0) {
      return res.send({ error: "Email not found " });
    }
  
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "citesmern2104@gmail.com",
          pass: "dvduwhzhnfpquwxz",
        },
      });

      let info = await transporter.sendMail({
        from: "citesmern2104@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Reset Password", // Subject line
        html: forgotPasswordLink("http://localhost:5173/resetpassword"), // html body
      });

      res.send({"success":"Please Check your email"})

};

module.exports = forgotPasswordController;
