const express = require("express");
const _ = express.Router();
const {createCategoryController,categoryStatusController,createSubCategoryController,subCategoryStatusController} = require("../../controllers/categoryController.js")

_.post("/createcategory",createCategoryController)
_.post("/categorystatus",categoryStatusController)
_.post("/createsubcategory",createSubCategoryController)
_.post("/subcategorystatus",subCategoryStatusController)


module.exports = _;