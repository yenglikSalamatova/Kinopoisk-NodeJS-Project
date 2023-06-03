const Genres = require("./genres");
const data = [
  "Комедии",
  "Мультфильмы",
  "Ужасы",
  "Фантастика",
  "Триллеры",
  "Боевики",
  "Мелодрамы",
  "Детективы",
  "Приключения",
  "Фэнтези",
  "Военные",
];

async function writeDataGenre() {
  const lenght = await Genres.count();
  console.log(lenght);
  if (lenght == 0) {
    data.map((item, index) => {
      new Genres({
        name: item,
        key: index,
      }).save();
    });
  }
}

module.exports = writeDataGenre;
