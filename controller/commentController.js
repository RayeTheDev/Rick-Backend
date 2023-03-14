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
    const body = req.body
    const result = await new CommentModel(body).save()
    res.send(result)
}

exports.deleteAllComments = async (req, res) => {
    res.send(await CommentModel.deleteMany());
};