const mongoose = require("mongoose");

const { Schema } = mongoose;

const discountSchema = new Schema({
    
    percent:{
        type: Number
    },
    cash: {
        type: Number
    },

    flat:{
        type: Boolean,
        default: false
    },

    category:{
        type: Schema.Types.ObjectId,
        ref: "Category"
    },

    subCategory:{
        type: Schema.Types.ObjectId,
        ref: "SubCategory"
    },

    product:{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }



  });
  
  module.exports = mongoose.model("Discount", discountSchema);