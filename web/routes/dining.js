const express = require("express");

const router = express.Router();
const jihyeonController = require("../controller/jihyeon");

router.get("/", (req, res, next) => {
  res.render("main");
});

module.exports = router;
