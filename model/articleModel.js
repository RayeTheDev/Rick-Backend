const { Schema, Types, model } = require("mongoose")

const Article = new Schema({
    title: { type: String, required: true },
    texts: { type: String, required: true },
    category: String,
    createdAt: { type: Date, default: Date.now() },
    photoUrl: String,
    vievws: Number,
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

})
const ArticleModel = model("Article", Article)
module.exports = { ArticleModel }

