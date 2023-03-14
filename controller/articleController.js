const { ArticleModel } = require("../model/articleModel");


exports.getArticle = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    const result=await ArticleModel.findByIdAndUpdate(req.params.id,{views:article.views+1}).populate("category");
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};
exports.getArticles = async (req, res) => {
  try {
    const article = await ArticleModel.find({}).populate("category");
    res.send(article);
  } catch (error) {
    res.send(error);
  }
};
exports.createArticle = async (req, res) => {
  try {
    const body = req.body;
    if (!body.title) {
      res.status(401).json("Title is required");
      return;
    }
    if (!body.texts) {
      res.status(401).json("Texts is required");
      return;
    }
    if (!body.category) {
      res.status(401).json("Category is required");
      return;
    }
    if (!body.photoUrl) {
      res.status(401).json("Photo is required");
      return;
    }
    if (!body.creatorId) {
      res.status(401).json("Creator is required");
      return;
    }
    const result = await new ArticleModel(body).save();
    res.send(result);
  } catch (error) {
    res.send("Null data")
  }
};

exports.deleteArticle = async (req, res) => {
  res.send(await ArticleModel.findByIdAndDelete(req.params.id))
};
exports.deleteAllArticles = async (req, res) => {
  res.send(await ArticleModel.deleteMany());
};
