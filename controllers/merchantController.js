const Store = require("../models/merchantModel");
const User = require("../models/usersModel");

async function becomeMerchant(req, res) {
  const { storename, officialemail, officialPhone, address, owner, products } =
    req.body;

  const store = new Store({
    storename,
    officialemail,
    officialPhone,
    address,
    owner,
    products,
  });

  store.save();

  await User.findOneAndUpdate(
    { _id: owner },
    { role: "merchant" },
    { new: true }
  );

  // res.send({success: "Store created. Congratulation you become a merchant"})
  res.send(store);
}

async function allstore(req, res) {
  let data = await Store.find({ owner: "6465f04bfa6a0ec2a6879477" });
  console.log("store", data);
  res.send(data);
}

module.exports = { becomeMerchant, allstore };
