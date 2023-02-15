const { Schema, model, Types } = require("mongoose")

const User = new Schema({
    isMan: Boolean,
    username: {
        first: String,
        last: String
    },
    password: String,
    photoUrl: String,
    locations: String,
    email: String,
    roles: { type: Object, default: { "User": 200 } },
    articles: [{
        type: Schema.Types.ObjectId,
        default: null,
        required: true,
        ref: "Article"
    }],

})
const userModel = model("User", User)
module.exports = { userModel }