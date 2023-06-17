const mongoose = require("mongoose");

const { Schema } = mongoose;

const optionSchema = new Schema({
    
    name:{
        type: String,
        required: true
    },

    value:[
        {
           name:{
                type:String,
                required: true
           },
           price:{
            type:Number,
          },  
          quantity:{
            type: Number,
            required: true
        },
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
   
   module.exports = mongoose.model("Option", optionSchema);