const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();
const authController = require("../controller/auth");

router
  .route("/join")
  .get(isNotLoggedIn, authController.getJoin)
  .post(isNotLoggedIn, authController.postJoin);

router
  .route("/login", isNotLoggedIn)
  .get(isNotLoggedIn, authController.getLogin)
  .post(isNotLoggedIn, authController.postLogin);

router.get("/logout", isLoggedIn, authController.getLogout);

module.exports = router;
