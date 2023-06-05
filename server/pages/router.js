const express = require("express");
const router = express.Router();
const Genres = require("../Genres/genres");
const Country = require("../Country/Country");
const User = require("../auth/User");
const Film = require("../films/film");
const Rate = require("../rates/rates");
const { isAdmin, isAuth } = require("../auth/middlewares");

router.get("/", async (req, res) => {
  const options = {};
  const genre = await Genres.findOne({ key: req.query.genre });
  console.log(genre);
  if (req.query.genre) {
    options.genre = genre.id;
    res.locals.genre = req.query.genre;
  }
  let page = 0;
  const limit = 3;

  if (req.query.page && req.query.page > 0) {
    page = req.query.page;
  }

  if (req.query.search && req.query.search.length > 0) {
    options.$or = [
      {
        titleRus: new RegExp(req.query.search, "i"),
      },
      {
        titleEng: new RegExp(req.query.search, "i"),
      },
    ];
    res.locals.search = req.query.search;
  }

  const totalFilms = await Film.count(options);
  console.log(totalFilms);
  const allGenres = await Genres.find();
  const films = await Film.find(options)
    .limit(limit)
    .skip(page * limit)
    .populate("country")
    .populate("genre");
  const user = req.user ? await User.findById(req.user.id) : {};
  res.render("index", {
    genres: allGenres,
    user: user,
    films,
    pages: Math.ceil(totalFilms / limit),
  });
});

router.get("/login", (req, res) => {
  res.render("login", { user: req.user ? req.user : {} });
});
router.get("/register", (req, res) => {
  res.render("register", { user: req.user ? req.user : {} });
});
router.get("/profile/:id", async (req, res) => {
  const allGenres = await Genres.find();
  const user = await User.findById(req.params.id).populate({
    path: "toWatch",
    populate: [{ path: "country" }, { path: "genre" }],
  });
  if (user) {
    res.render("profile", { genres: allGenres, loginUser: req.user, user });
  } else {
    res.redirect("not-found");
  }
});

router.get("/admin/:id", isAdmin, async (req, res) => {
  const allGenres = await Genres.find();
  const user = await User.findById(req.params.id);
  const films = await Film.find()
    .populate("country")
    .populate("genre")
    .populate("author");
  res.render("admin-profile", {
    genres: allGenres,
    loginUser: req.user ? req.user : {},
    user,
    films,
  });
});

router.get("/new", async (req, res) => {
  const allGenres = await Genres.find();
  const allCountries = await Country.find();
  res.render("new-film", {
    genres: allGenres,
    countries: allCountries,
    user: req.user ? req.user : {},
  });
});

router.get("/edit/:id", async (req, res) => {
  const allGenres = await Genres.find();
  const allCountries = await Country.find();
  const film = await Film.findById(req.params.id);
  res.render("edit-film", {
    genres: allGenres,
    countries: allCountries,
    user: req.user ? req.user : {},
    film,
  });
});

router.get("/not-found", (req, res) => {
  res.render("not-found");
});

router.get("/detail/:id", async (req, res) => {
  const rates = await Rate.find({ filmId: req.params.id }).populate("authorId");
  let averageRate = 0;
  for (let i = 0; i < rates.length; i++) {
    averageRate += rates[i].rate;
  }
  const film = await Film.findById(req.params.id)
    .populate("country")
    .populate("genre");
  res.render("detail", {
    user: req.user ? req.user : {},
    film,
    rates,
    averageRate: (averageRate / rates.length).toFixed(1),
  });
});

module.exports = router;
