const express = require("express");
const router = express.Router();

const { saveToWatch, deleteFromToWatch } = require("./controller");
const { isAuth } = require("../auth/middlewares");

router.post("/api/saveToWatch", isAuth, saveToWatch);
router.delete("/api/saveToWatch/:id", isAuth, deleteFromToWatch);
module.exports = router;
