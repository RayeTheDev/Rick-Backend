const { Schema, model, Types } = require("mongoose");

const User = new Schema({
  gender: String,
  username: {
    first: String,
    last: String,
  },
  password: String,
  photoUrl: String,
  locations: String,
  email: String,


  roles: { type: Object, default: { User: 200 } },
  articles: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Article",
    },
  ],
  isVerified: { type: Boolean, default: false },
});
const userModel = model("User", User);
module.exports = { userModel };
