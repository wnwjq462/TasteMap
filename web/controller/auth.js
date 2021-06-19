const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.getJoin = (req, res) => {
  res.json({ error: req.query.error || null }).send("join.html");
  //res.render("join", { error: req.query.error || null });
};

exports.postJoin = async (req, res, next) => {
  const { account, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { acoount } });
    if (exUser) {
      return res.status(400).redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      account,
      password: hash,
    });
    return res.status(200).redirect("/login");
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.getLogin = (req, res) => {
  res.json({ error: req.query.error || null }).send("login.html");
  //res.render("login", { error: req.query.error || null });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(loginError);
      return next(loginError);
    }
    if (!user) {
      return res.status(400).redirect(`/login?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).redirect("/");
    });
  })(req, res, next);
};

exports.getLogout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
