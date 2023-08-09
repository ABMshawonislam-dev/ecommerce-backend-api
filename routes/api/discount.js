const express = require("express");
const _ = express.Router();
const {createDiscount,allDiscount} = require("../../controllers/discountController")


_.post("/creatediscount",createDiscount)
_.get("/alldiscount",allDiscount)


module.exports = _;