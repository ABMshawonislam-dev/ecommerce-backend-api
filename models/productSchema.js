const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
    
    name:{
        type: String,
        required: true
    },
    
    description:{
        type: String,
        required: true
    },
 
    variants:[
        {
            type: Schema.Types.ObjectId,
            ref:"Variant"
        }
    ],

    store:{
        type: Schema.Types.ObjectId,
        ref:"Store"
    },

    updated: {
        type: Date,
    },

    created: {
        type: Date,
        default: Date.now,
    },
 
 
   });
   
   module.exports = mongoose.model("Product", productSchema);