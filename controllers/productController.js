const User = require("../models/usersModel");
const Product = require("../models/productSchema");
const Variant = require("../models/variantSchema");

async function secureUpload(req, res, next) {
  let userid = req.headers.authorization.split("@")[1];
  let password = req.headers.authorization.split("@")[2];

  if (!req.headers.authorization) {
    return res.send({ error: "Unauthorized" });
  }

  let user = await User.find({ _id: userid });

  if (user.length > 0) {
    if (password == process.env.MERCHANT_SECRET_KEY) {
      if (user[0].role == "merchant") {
        next();
      }
    } else {
      return res.send({ error: "You are not able to create product" });
    }
  } else {
    return res.send({ error: "You are not able to create product" });
  }
}

async function createProduct(req, res) {
  let { name, description, image, store } = req.body;

  let product = new Product({
    name,
    description,
    image,
    store,
  });

  product.save();

  res.send({ success: "Product Created Successfully" });
}

async function createVariant(req, res) {
  let { color, image, storage, ram, size, price, quantity, product } = req.body;

  let variant = new Variant({
    color,
    image: `${process.env.IMAGE_PATH}/uploads/${req.file.filename}`,
    storage,
    ram,
    size,
    price,
    quantity,
    product,
  });

  variant.save();

  await Product.findOneAndUpdate(
    { _id: variant.product },
    { $push: { variants: variant._id } },
    { new: true }
  );

  res.send({ success: "Variant Created Successfully" });
}

async function allproducts(req, res) {
  let data = await Product.find({}).populate("store");

  res.send(data);
}

async function allvariant(req, res) {
  let data = await Variant.find({}).populate("product");

  res.send(data);
}

async function deleteproduct(req, res) {
  let data = await Product.findByIdAndDelete(req.body.id);
  res.send("Delete Successful");
}

module.exports = {
  secureUpload,
  createProduct,
  createVariant,
  allproducts,
  deleteproduct,
  allvariant,
};
