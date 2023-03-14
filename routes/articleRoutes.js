const express = require("express");
const {
  createArticle,
  deleteAllArticles,
  deleteArticle,
  getArticles,
  getArticle,
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
  .get("/articles/:id", getArticle)
  .post("/articles", createArticle)
  .delete("/articles", deleteAllArticles)
  .delete("/article/:id", deleteArticle);

exports.articleRouter = router;
