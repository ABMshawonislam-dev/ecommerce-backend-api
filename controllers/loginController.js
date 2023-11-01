const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const emailValidation = require("../helpers/emailValidation.js");

let loginController = async (req, res) => {
  let { email, password } = req.body;

  if (!email) {
    return res.send({ error: "Enter Email " });
  } else if (!emailValidation(email)) {
    return res.send({ error: "Enter a valid email " });
  } else if (!password) {
    return res.send({ error: "Enter Password " });
  } else {
    let isEmailExist = await User.find({ email });

    if (isEmailExist.length > 0) {
      bcrypt
        .compare(password, isEmailExist[0].password)
        .then(function (result) {
          // result == true
          if (result) {
            res.send({
              success: "Login Successfull.",
              fullName: isEmailExist[0].fullName,
              email: isEmailExist[0].email,
              role: isEmailExist[0].role
            });
          } else {
            res.json({ error: "Password Not Match" });
          }
        });
    } else {
      res.json({ error: "Email Not Match" });
    }
  }

  console.log(email, password);
};

module.exports = loginController;
