const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Keyword = require("../models/keyword");

exports.getJoin = (req, res) => {
  //res.json({ error: req.query.error || null }).send("join.html");
  res.render("signup");
};

exports.postJoin = async (req, res, next) => {
  const { account, password, keywords } = req.body;

  try {
    const exUser = await User.findOne({ where: { account } });
    if (exUser) {
      return res.status(400).json({ message: "이미 존재하는 회원입니다." });
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      account,
      password: hash,
    });

    for (const keyword of keywords) {
      const exKeyword = await Keyword.findOne({ where: { name: keyword } });
      if (!exKeyword) {
        await User.destroy({ where: { id: user.id } });
        return res.status(400).json({ message: "DB에 없는 키워드 입니다" });
      }

      await user.addKeyword(exKeyword);
    }

    return res.status(200).json({ message: "회원가입이 성공하였습니다." });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.getLogin = (req, res) => {
  //res.json({ error: req.query.error || null }).send("../views/login.html");
  //console.log(req.query.loginError);
  res.render("login");
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(loginError);
      return next(loginError);
    }
    if (!user) {
      return res.status(400).send(info.message);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).json({ message: "로그인이 성공했습니다." });
    });
  })(req, res, next);
};

exports.getLogout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
