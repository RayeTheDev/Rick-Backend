const express = require("express");
const {
  createArticle,
  deleteAllArticles,
  getArticles,
} = require("../controller/articleController");
const {
  createUser,
  deleteAllUser,
  loginUser,
  authenticateToken,
} = require("../controller/userController");
const { userCheck, loginMiddleware } = require("../middleware/userMid");
const router = express.Router();

router
  .get("/articles", getArticles)
  .post("/articles", createArticle)
  .delete("/articles", deleteAllArticles);

exports.articleRouter = router;
