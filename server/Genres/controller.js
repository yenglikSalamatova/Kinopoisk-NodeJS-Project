const Genres = require("./genres");

const getAllGenres = async (req, res) => {
  const data = await Genres.find();
  res.send({ data });
};

module.exports = { getAllGenres };
