const express = require("express");
const _ = express.Router();
const {secureUpload,createProduct,createVariant} = require("../../controllers/productController")

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(file.originalname.split(".")[1])
      cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.originalname.split(".")[1]}`)
    }
  })
  
  const upload = multer({ storage: storage })

_.post("/createproduct",secureUpload,createProduct)
_.post("/createvariant", upload.single('image'),createVariant)



module.exports = _;