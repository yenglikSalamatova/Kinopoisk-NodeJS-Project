const express = require("express");
const router = express.Router();
const writeDataGenre = require("./seed");
const { getAllGenres } = require("./controller");
router.get("/api/genre", getAllGenres);

writeDataGenre();

module.exports = router;
