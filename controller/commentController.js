const { CommentModel } = require("../model/commentModel")

exports.getComments = async (req, res) => {
    const result = await CommentModel.find({})
    res.send(result)
}
exports.getComment = async (req, res) => {
    const result = await CommentModel.find({})
    res.send(result)
}
exports.createComment = async (req, res) => {
    const info={
        name:req.body.name?req.body.name:"Зочин",
        texts:req.body.texts,
        article:req.body.article
    }
    const result = await new CommentModel(info).save()
    res.send(result)
}

exports.deleteAllComments = async (req, res) => {
    res.send(await CommentModel.deleteMany());
};