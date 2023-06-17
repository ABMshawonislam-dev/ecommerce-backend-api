const express = require("express");
const _ = express.Router();
const {secureUpload,createProduct,createVariant} = require("../../controllers/productController")

_.post("/createproduct",secureUpload,createProduct)
_.post("/createvariant",createVariant)



module.exports = _;