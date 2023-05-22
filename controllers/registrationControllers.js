const emailValidation = require("../helpers/emailValidation.js");
const User = require("../models/usersModel.js");
const bcrypt = require("bcrypt");
const otpTemplate = require("../helpers/optTemplate.js");
const sendEmail = require("../helpers/emailValidation");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const nodemailer = require("nodemailer");

let registrationControllers = async (req, res) => {
  const { fullName, email, password, avatar, facebookId, linkdinId } = req.body;

  if (!fullName) {
    return res.send({ error: "Enter Fullname " });
  } else if (!email) {
    return res.send({ error: "Enter Email " });
  } else if (!emailValidation(email)) {
    return res.send({ error: "Enter a valid email " });
  } else if (!password) {
    return res.send({ error: "Enter Password " });
  } else {
    let duplicateEmail = await User.find({ email: email });

    if (duplicateEmail.length > 0) {
      return res.send({ error: "Email Already Exists. Try another " });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      const user = new User({
        fullName,
        email,
        password: hash,
        avatar,
        facebookId,
        linkdinId,
      });

      user.save();
      const generator2 = aleaRNGFactory(Date.now());
      let randomNumber = generator2.uInt32().toString().substring(0, 4);

      let rendomOtpStore = await User.findOneAndUpdate(
        { email },
        { $set: { randomOtp: randomNumber } },
        { new: true }
      );

      // sendEmail(email, randomNumber, otpTemplate);
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
        subject: "Please Varify Your Email", // Subject line
        html: otpTemplate(randomNumber), // html body
      });

      // setTimeout(async function () {
      //   console.log("OTP Deleted");
      //   let rendomOtpStore = await User.findOneAndUpdate(
      //     { email },
      //     { $unset: { randomOtp: "" } },
      //     { new: true }
      //   );
      // }, 60000);

      res.send({
        success: "Registration Successfull,Please Check your Email",
        fullName: user.fullName,
        email: user.email,
      });
    });
  }
};

module.exports = registrationControllers;
