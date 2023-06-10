const User = require("../models/usersModel")

async function secureUpload(req,res,next){

    let userid= req.headers.authorization.split('@')[1]
    let password= req.headers.authorization.split('@')[2]

    if(!req.headers.authorization){
        return res.send({error: "Unauthorized"})
    }

    let user = await User.find({_id:userid})



    if(user.length > 0){
       

        if(password == process.env.MERCHANT_SECRET_KEY){
                if(user[0].role == "merchant"){
                 next()
                }
        }else{
            return res.send({error: "You are not able to create product"})
        }
       
   
    }else{
        return res.send({error: "You are not able to create product"})
    }





    
}

async function createProduct(req,res){
    console.log("Lets Create Prodcut")
}

module.exports = {secureUpload,createProduct}