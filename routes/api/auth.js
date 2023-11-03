const express = require("express");
const _ = express.Router();
const registrationControllers = require("../../controllers/registrationControllers");
const loginController = require("../../controllers/loginController");
const emailvarificationOtpmatch = require("../../controllers/emailVarificationOtpMatch");

const {becomeMerchant} = require("../../controllers/merchantController");
const forgotPasswordController = require("../../controllers/forgotPasswordController");
const resetpassword = require("../../controllers/resetpassword");

_.post("/registration", registrationControllers);
_.post("/login", loginController);
_.post("/emailvarificationOtpmatch", emailvarificationOtpmatch);
_.post("/becomemerchant", becomeMerchant);
_.post("/forgotpassword", forgotPasswordController);
_.post("/resetpassword", resetpassword);

module.exports = _;
