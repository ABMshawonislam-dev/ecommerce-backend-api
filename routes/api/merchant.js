const express = require("express");
const _ = express.Router();
const {becomeMerchant} = require("../../controllers/merchantController")


_.post("/becomemerchant",becomeMerchant)

module.exports = _;