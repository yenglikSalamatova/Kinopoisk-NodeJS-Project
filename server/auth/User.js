const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
  email: String,
  full_name: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  toWatch: [{ type: Schema.Types.ObjectId, ref: "film" }],
  watched: [{ type: Schema.Types.ObjectId, ref: "film" }],
  googleId: String,
});

module.exports = mongoose.model("user", UserSchema);
