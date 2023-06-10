const Store = require("../models/merchantModel")
const User = require("../models/usersModel")

async function becomeMerchant(req,res){
    const {storename,officialemail,officialPhone,address,owner,products} = req.body


    const store = new Store({
        storename,
        officialemail,
        officialPhone,
        address,
        owner,
        products
    })

    store.save()



    await User.findOneAndUpdate({_id:owner},{role:"merchant"},{new:true})



    // res.send({success: "Store created. Congratulation you become a merchant"})
    res.send(store)

}

module.exports = {becomeMerchant}

