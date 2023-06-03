const Country = require("./Country");
const data = [
  "Россия",
  "СССР",
  "США",
  "Франция",
  "Южная Корея",
  "Великобритания",
  "Япония",
  "Италия",
  "Испания",
  "Германия",
  "Турция",
];

async function writeDataCountry() {
  const lenght = await Country.count();
  console.log(lenght);
  if (lenght == 0) {
    data.map((item, index) => {
      new Country({
        name: item,
        key: index,
      }).save();
    });
  }
}

module.exports = writeDataCountry;
