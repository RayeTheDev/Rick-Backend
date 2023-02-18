const { Schema, Types, model, SchemaType } = require("mongoose")

const Article = new Schema({
    title: { type: String, required: true },
    texts: {
        type: Object, required: true
    },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    createdAt: { type: Date, default: Date.now() },
    photoUrl: String,
    vievws: Number,
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    creatorId: Schema.Types.ObjectId

})
const ArticleModel = model("Article", Article)
module.exports = { ArticleModel }

