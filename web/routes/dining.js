const express = require("express");

const router = express.Router();
const jihyunController = require("../controller/jihyun");

router.get("/", jihyunController.getDining);

module.exports = router;
