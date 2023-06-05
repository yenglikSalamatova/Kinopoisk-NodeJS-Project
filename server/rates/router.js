const express = require("express");
const router = express.Router();

const { saveRate } = require("./controller");
const { isAuth } = require("../auth/middlewares");

router.post("/api/rate", isAuth, saveRate);

module.exports = router;
