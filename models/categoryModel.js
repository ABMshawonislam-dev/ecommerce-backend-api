const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
   name:{
    type: String,
    required: true
   },
   description:{
    type: String
   },
   isActive:{
    type:Boolean,
    default: false,
   },
   status:{
    type: String,
    default:"waiting",
    enum:["waiting","approved","rejected"]
   },
   subCategory:[
    {
        type: Schema.Types.ObjectId,
        ref:"SubCategory"
    }
   ],
   updated: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },



  });
  
  module.exports = mongoose.model("Category", categorySchema);