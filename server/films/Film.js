const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FilmSchema = new mongoose.Schema({
  titleRus: String,
  titleEng: String,
  time: Number,
  year: Number,
  country: { type: Schema.Types.ObjectId, ref: "country" },
  genre: { type: Schema.Types.ObjectId, ref: "genre" },
  image: String,
  author: { type: Schema.Types.ObjectId, ref: "user" },
  video: String,
  series: [String],
});

const Film = mongoose.model("film", FilmSchema);

module.exports = Film;
