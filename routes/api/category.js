const express = require("express");
const _ = express.Router();
const {createCategoryController,categoryStatusController,createSubCategoryController,subCategoryStatusController,getAllCategory,getAllSubCategory} = require("../../controllers/categoryController.js")

_.post("/createcategory",createCategoryController)
_.post("/categorystatus",categoryStatusController)
_.post("/createsubcategory",createSubCategoryController)
_.post("/subcategorystatus",subCategoryStatusController)
_.get("/getallcategory",getAllCategory)
_.get("/getallsubcategory",getAllSubCategory)


module.exports = _;