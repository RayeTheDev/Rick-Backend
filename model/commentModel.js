const { Schema, Types, model } = require("mongoose")

const Comment = new Schema({
    texts: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    photoUrl: String,
    vievws: Number,
    likes: Number,
    creatorId: Schema.Types.ObjectId

})
const CommentModel = model("Comment", Comment)
module.exports = { CommentModel }

