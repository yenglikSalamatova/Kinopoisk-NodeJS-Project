const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: String,
  full_name: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", UserSchema);
