const express = require("express");

const router = express.Router();
const hyeongooController = require("../controller/hyeongoo");

router.get("/", hyeongooController.getKeyword);

module.exports = router;
