const Category = require("../models/categoryModel.js")
const SubCategory = require("../models/subcategoryModel.js")

async function createCategoryController(req,res){
    const {name,description} = req.body
    console.log(name,description)

    let duplicateCategory = await Category.find({ name });

    if (duplicateCategory.length > 0) {
      return res.send({ error: "Category Already Exists. Try another " });
    }


    let category = new Category({
        name,
        description
    })

    category.save()

    res.send({success:"Category Created SuccessFully"})



}

async function categoryStatusController(req,res){
  const {name,status} = req.body
  console.log(name,status)

  if(status == "rejected" || status == "waiting"){
    let updateCategory = await Category.findOneAndUpdate({name},{$set:{isActive: false,status:status}},{new:true})

    return res.send({success: "Status Updated"})
  }else if(status == "approved"){
    let updateCategory = await Category.findOneAndUpdate({name},{$set:{isActive: true,status:status}},{new:true})

    return res.send({success: "Status Updated asd"})
  }

}


// ============================

async function createSubCategoryController(req,res){
  const {name,description,category} = req.body
  console.log(category)



  let duplicateSubCategory = await SubCategory.find({ name });

  if (duplicateSubCategory.length > 0) {
    return res.send({ error: "Sub Category Already Exists. Try another " });
  }


  let subcategory = new SubCategory({
      name,
      description,
      category
  })

  subcategory.save()
  console.log(subcategory._id)
  console.log(subcategory.category)

  await Category.findOneAndUpdate({_id: subcategory.category},{$push:{subCategory: subcategory._id}},{new:true})

  res.send({success:"Sub Category Created SuccessFully"})



}

async function subCategoryStatusController(req,res){
const {name,status} = req.body
console.log(name,status)

if(status == "rejected" || status == "waiting"){
  let updateCategory = await SubCategory.findOneAndUpdate({name},{$set:{isActive: false,status:status}},{new:true})

  return res.send({success: "Status Updated"})
}else if(status == "approved"){
  let updateCategory = await SubCategory.findOneAndUpdate({name},{$set:{isActive: true,status:status}},{new:true})

  return res.send({success: "Status Updated asd"})
}

}

// ============================

async function getAllCategory(req,res){
  const data = await Category.find({}).populate("subCategory")
  res.send(data)
}



async function getAllSubCategory(req,res){
  const data = await SubCategory.find({}).populate("category")
  res.send(data)
}




module.exports = {createCategoryController,categoryStatusController,createSubCategoryController,subCategoryStatusController,getAllCategory,getAllSubCategory}