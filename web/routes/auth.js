const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();
const authController = require("../controller/auth");
const { route } = require("./user");

route.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.likeDining = [];
  next();
});

router
  .route("/join", isNotLoggedIn)
  .get(authController.getJoin)
  .post(authController.postJoin);

router
  .route("/login", isNotLoggedIn)
  .get(authController.getLogin)
  .post(authController.postLogin);

router.get("/logout", isLoggedIn, authController.getLogout);

module.exports = router;
