const express = require("express");
const { getCategories, createCategory } = require("../controller/categoryController");

const router = express.Router();

router
  .get("/categories", getCategories)
  .post("/categories", createCategory)

exports.categoryRouter = router;
