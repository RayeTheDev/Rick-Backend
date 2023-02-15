const { ArticleModel } = require("../model/articleModel")

exports.createArticle = async (req, res) => {
    const body = req.body
    const result = await new ArticleModel(body).save()
    res.send(result)
}

exports.deleteAllArticles = async (req, res) => {
    res.send(await ArticleModel.deleteMany());
};