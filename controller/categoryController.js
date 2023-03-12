
const { idGenerator } = require("generate-custom-id");
const { CategoryModel } = require("../model/categoryModel");

exports.getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.send(categories);
  } catch (error) {
    res.send(error);
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body || {};
  try {
    const data=await CategoryModel.find({name:name})
    if(data.length!=0){
      return res.send("This category already there")
    }
    const categoryDoc = new CategoryModel({ name });
    const category = await categoryDoc.save();
    res.send(category);
  } catch (error) {
    res.send(error);
  }
};