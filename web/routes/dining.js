const express = require("express");

const router = express.Router();
const jihyeonController = require("../controller/jihyeon");

router.get("/", jihyeonController.getDining);

module.exports = router;
