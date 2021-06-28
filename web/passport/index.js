const passport = require("passport");
const local = require("./localStrategy");
const User = require("../models/user");
const Keyword = require("../models/keyword");
const Dining = require("../models/dining");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      attributes: ["id", "account"],
      where: { id },
      include: [
        {
          model: Keyword,
          attributes: ["id", "name"],
        },
        {
          model: Dining,
          attributes: ["id", "name"],
        },
      ],
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
