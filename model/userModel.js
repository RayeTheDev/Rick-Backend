const { Schema, model } = require("mongoose")

const User = new Schema({
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    isMan: Boolean,
    username: {
        first: String,
        last: String
    },
    password: String,
    photoUrl: String,
    locations: String,
    email: String,
    articles: {
        type:Array,
        default:null,
        required: true
    },

})
const userModel = model("User", User)
module.exports = { userModel }