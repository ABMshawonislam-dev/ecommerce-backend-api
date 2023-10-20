const express = require("express");
const _ = express.Router();
const {
  becomeMerchant,
  allstore,
} = require("../../controllers/merchantController");

_.post("/becomemerchant", becomeMerchant);
_.get("/allstore", allstore);

module.exports = _;
