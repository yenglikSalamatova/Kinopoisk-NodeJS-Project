const Film = require("./film");

const createFilm = async (req, res) => {
  if (
    req.file &&
    req.body.titleRus.length > 2 &&
    req.body.titleEng.length > 2 &&
    req.body.year * 1 > 0 &&
    req.body.time * 1 > 0 &&
    req.body.country &&
    req.body.genre
  ) {
    await new Film({
      titleRus: req.body.titleRus,
      titleEng: req.body.titleEng,
      time: req.body.time,
      year: req.body.year,
      country: req.body.country,
      genre: req.body.genre,
      image: `/images/films/${req.file.filename}`,
      author: req.user.id,
    }).save();
    console.log("Новый фильм создан");
    res.redirect(`/admin/${req.user.id}`);
  } else {
    res.redirect("/new?error=1");
  }
};

const editFilm = async (req, res) => {
  console.log(req.params.id);
  if (
    req.file &&
    req.body.titleRus > 2 &&
    req.body.titleEng > 2 &&
    req.body.year > 0 &&
    req.body.time &&
    req.body.country &&
    req.body.genre
  ) {
  } else {
    res.redirect(`/edit/${req.body.id}?error=1`);
  }
};

module.exports = {
  createFilm,
  editFilm,
};
