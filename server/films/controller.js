const Film = require("./film");
const fs = require("fs");
const path = require("path");

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
    if (req.body.video && req.body.video.length > 2) {
      await new Film({
        titleRus: req.body.titleRus,
        titleEng: req.body.titleEng,
        time: req.body.time,
        year: req.body.year,
        country: req.body.country,
        genre: req.body.genre,
        image: `/images/films/${req.file.filename}`,
        author: req.user.id,
        video: req.body.video,
      }).save();
    } else if (req.body.series && req.body.series.length > 0) {
      await new Film({
        titleRus: req.body.titleRus,
        titleEng: req.body.titleEng,
        time: req.body.time,
        year: req.body.year,
        country: req.body.country,
        genre: req.body.genre,
        image: `/images/films/${req.file.filename}`,
        author: req.user.id,
        series: req.body.series,
      }).save();
    }
    console.log("Новый фильм создан");
    res.redirect(`/admin/${req.user.id}`);
  } else {
    res.redirect("/new?error=1");
  }
};

const editFilm = async (req, res) => {
  if (
    req.body.titleRus.length > 2 &&
    req.body.titleEng.length > 2 &&
    req.body.year > 0 &&
    req.body.time > 0 &&
    req.body.country.length > 0 &&
    req.body.genre.length > 0 &&
    req.body.video.length > 2
  ) {
    const film = await Film.findById(req.body.id);
    console.log(film);
    if (req.file) {
      fs.unlink(path.join(__dirname, "../../public", film.image), (err) => {
        if (err) console.log(err);
      });
      film.image = `/images/films/${req.file.filename}`;
    }
    film.titleRus = req.body.titleRus;
    film.titleEng = req.body.titleEng;
    film.year = req.body.year;
    film.time = req.body.time;
    film.country = req.body.country;
    film.genre = req.body.genre;
    film.author = req.user.id;
    film.video = req.body.video;
    film.save();
    res.redirect("/admin/" + req.user.id);
  } else {
    res.redirect(`/edit/${req.body.id}?error=1`);
  }
};

const deleteFilm = async (req, res) => {
  const film = await Film.findById(req.params.id);
  if (film) {
    fs.unlink(path.join(__dirname, "../../public", film.image), (err) => {
      if (err) console.log(err);
    });
    await Film.deleteOne({ _id: req.params.id });
    res.status(205).send("ok");
  } else {
    res.status(404).send("not found");
  }
};

module.exports = {
  createFilm,
  editFilm,
  deleteFilm,
};
