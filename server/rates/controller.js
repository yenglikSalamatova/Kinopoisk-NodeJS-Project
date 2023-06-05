const Rates = require("./rates");
const saveRate = async (req, res) => {
  if (req.body.authorId && req.body.filmId && req.body.rate) {
    await new Rates({
      rate: req.body.rate,
      text: req.body.text,
      authorId: req.body.authorId,
      filmId: req.body.filmId,
    }).save();
    res.status(200).send(true);
  }
};
module.exports = { saveRate };
