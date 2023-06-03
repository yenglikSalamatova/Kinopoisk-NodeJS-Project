const mongoose = require("mongoose");

const FilmSchema = new mongoose.Schema({
  titleRus: String,
  titleEng: String,
  key: Number,
  time: String,
  year: Number,
  country: String,
  genre: String,
  image: String,
});

module.exports = mongoose.model("film", FilmSchema);
