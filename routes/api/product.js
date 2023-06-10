const express = require("express");
const _ = express.Router();
const {secureUpload,createProduct} = require("../../controllers/productController")

_.post("/createproduct",secureUpload,createProduct)



module.exports = _;