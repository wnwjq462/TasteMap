const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();
const suyongController = require("../controller/suyong");
const jihyunController = require("../controller/jihyun");
const hyeongooController = require("../controller/hyeongoo");

router
  .route("/")
  .get(isLoggedIn, suyongController.getUser)
  .post(isLoggedIn, suyongController.postUser);

router.get("/keyword", isLoggedIn, hyeongooController.getUserKeyword);

router.get("/like", isLoggedIn, jihyunController.getUserLike);

router
  .route("/like/:diningId")
  .post(isLoggedIn, hyeongooController.postUserLike)
  .delete(isLoggedIn, hyeongooController.deleteUserLike);

module.exports = router;
