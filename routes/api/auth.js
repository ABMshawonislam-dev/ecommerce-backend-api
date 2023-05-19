const express = require("express");
const _ = express.Router();
const registrationControllers = require("../../controllers/registrationControllers");
const loginController = require("../../controllers/loginController");
const emailvarificationOtpmatch = require("../../controllers/emailVarificationOtpMatch");

_.post("/registration", registrationControllers);
_.post("/login", loginController);
_.post("/emailvarificationOtpmatch", emailvarificationOtpmatch);

module.exports = _;
