const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/kinopoisk")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("Failed to connect to MongoDB");
    console.log(e.message);
  });

// module.exports = mongoose;
