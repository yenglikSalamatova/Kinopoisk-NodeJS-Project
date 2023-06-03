const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name: String,
  key: Number,
});

module.exports = mongoose.model("country", CountrySchema);
