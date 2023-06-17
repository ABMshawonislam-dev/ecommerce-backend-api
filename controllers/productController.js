const User = require("../models/usersModel")
const Product = require("../models/productSchema")
const Variant = require("../models/varinatSchema")

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
    let {name,description,image,store} = req.body


    let product = new Product({
        name,
        description,
        image,
        store
    })

    product.save()

    res.send({success:"Product Created Successfully"})



}

async function createVariant(req,res){
    let {name,image,product} = req.body


    let variant = new Variant({
        name,
        image,
        product
    })

    variant.save()

    await Product.findOneAndUpdate({_id: variant.product},{$push:{variants: variant._id}},{new:true})

    res.send({success:"Variant Created Successfully"})



}

module.exports = {secureUpload,createProduct,createVariant}