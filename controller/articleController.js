const { ArticleModel } = require("../model/articleModel");

exports.getArticles = async (req, res) => {
  try {
    const article = await ArticleModel.find({});
    res.send(article);
  } catch (error) {
    res.send(error);
  }
};
exports.createArticle = async (req, res) => {
  try {
    const body = req.body;
    const result = await new ArticleModel(body).save();
    res.send(result);
  } catch (error) {}
};

exports.deleteAllArticles = async (req, res) => {
  res.send(await ArticleModel.deleteMany());
};
