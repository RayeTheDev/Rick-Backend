const { Schema, Types, model } = require("mongoose")

const Comment = new Schema({
    texts: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    photoUrl: String,
    likes: {type:Number,default:0},
    name:String,
    article:String

})
const CommentModel = model("Comment", Comment)
module.exports = { CommentModel }

