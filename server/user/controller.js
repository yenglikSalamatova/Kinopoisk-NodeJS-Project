const User = require("../auth/User");
const Film = require("../films/film");

const saveToWatch = async (req, res) => {
  if (req.user && req.body.filmId) {
    const user = await User.findById(req.user.id);
    const findFilm = user.toWatch.filter((film) => film == req.body.filmId);
    if (findFilm.length == 0) {
      user.toWatch.push(req.body.filmId);
      await user.save();
      res.send("Фильм успешно сохранен");
    } else {
      res.send("Фильм уже сохранен");
    }
  }
};
const deleteFromToWatch = async (req, res) => {
  if (req.user && req.params.id) {
    const user = await User.findById(req.user.id);
    for (let i = 0; i < user.toWatch.length; i++) {
      if (user.toWatch[i] == req.params.id) {
        user.toWatch.splice(i, 1);
        user.save();
        res.send("Успешно удалено");
      }
    }
    // res.send("Данные не найдены");
  }
};

module.exports = { saveToWatch, deleteFromToWatch };
