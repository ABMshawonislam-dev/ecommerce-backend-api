const express = require("express");
const _ = express.Router();
const emailValidation = require("../../helpers/emailValidation.js")
const User = require("../../models/usersModel.js")
const bcrypt = require("bcrypt")
const otpTemplate = require("../../helpers/optTemplate.js")
const sendEmail = require("../../helpers/sendEmail.js")


_.post("/registration",async (req,res)=>{
    const {fullName, email, password,avatar,facebookId,linkdinId} = req.body
    

    if(!fullName){
        return res.send({error: "Enter Fullname "})
    } else if(!email){
        return res.send({error: "Enter Email "})
    }else if(!emailValidation(email)){
        return res.send({error: "Enter a valid email "})
    }else if(!password){
        return res.send({error: "Enter Password "})
    }else{

        let duplicateEmail = await User.find({email: email})


        if(duplicateEmail.length > 0){
            return res.send({error: "Email Already Exists. Try another "})
        }

        bcrypt.hash(password, 10, function(err, hash) {
            const user  = new User({
                fullName,
                email,
                password: hash,
                avatar,
                facebookId,
                linkdinId
            })

            user.save()
            sendEmail(email,"1215",otpTemplate)

            res.send({
                success: "Registration Successfull,Please Check your Email",
                fullName: user.fullName,
                email: user.email,

            })

        });

        // return res.send({success: "Registration Successfull "})
    }



})

module.exports = _;