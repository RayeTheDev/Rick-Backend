const { Schema, model } = require("mongoose");

const categoryModel = new Schema({
  name: { type: String, required: true },
});

const CategoryModel = model("Category", categoryModel);

exports.CategoryModel = CategoryModel;
