const express = require("express");
const User = require("../models/user");
const Keyword = require("../models/keyword");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res, next) => {
  //res.send("User info page");
  try {
    const user = await User.findOne({
      attributes: ["id", "account"],
      where: { id: req.user.id },
      include: [{
          model: Keyword,
          attributes: ["name"],
        }],
    });
    if (user) {
      res.status(200).render("info", { userInfo: user });
      //res.status(200).json(user);
    } else {
      res.status(400).json({ message: "client error: invalid user" });
    }
  } catch (err) {
    console.error(err);
    next(error);
  }
};

exports.postUser = async (req, res, next) => {
  try {
    //get user
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [{
          model: Keyword
        }],
    });
    if (!user) res.status(400).json({ message: "client error: invalid user" });

    //delete existing keyword relations
    for(let i=0;i<user.Keywords.length;i++)
      await user.removeKeyword(user.Keywords[i]);

    //insert keywords
    for(let i=0;i<req.body.keywords.length;i++){
      const keyword = await Keyword.findOne({
        where: { name: req.body.keywords[i] }
      });
      if (keyword) await user.addKeyword(keyword);
    }

    //update password
    if (req.body.password) {
      const hash = await bcrypt.hash(req.body.password, 12);
      await User.update(
        {
          password: hash,
        },
        {
          where: { id: req.user.id },
        }
      );
    }

    //error if keyword.len >9
    if (req.body.keywords.length > 9)
      res.status(400).json({ message: "client error: keyword over 9" });
    else 
      res.status(200).json({ message: "정보수정이 완료되었습니다."})
  } catch (err) {
    console.error(err);
    next(error);
  }
};
