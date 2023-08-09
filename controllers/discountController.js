const Discount = require("../models/discountModal.js")
async function createDiscount(req,res){
    let { percent,cash,flat,category,subCategory,product } = req.body

    let discount = new Discount({
        percent,
        cash,
        flat,
        category,
        subCategory,
        product
    })

    discount.save()

    res.send("Discount Created Successfully")



}


async function allDiscount(req,res){


    let data = await Discount.find({}).populate(["category","subCategory","product"])

    res.send(data)

}

module.exports = {createDiscount,allDiscount}