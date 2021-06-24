const express = require("express");
const User = require("../models/user");
const Keyword = require("../models/keyword");

exports.getUser = async (req, res, next) => {
  //res.send("User info page");
  // select id, account, keywords from User where id=req.user.id
  try {
    const user = await User.findOne({
      attributes: ["id", "account"],
      where: { id: req.user.id },
      include: [
        {
          model: Keyword,
          attributes: ["name"],
        },
      ],
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
    //delete existing keyword relations
    await db.sequelize.models.user_keyword.destroy({
      where: { id: req.user.id },
    });

    //insert keywords
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) res.status(400).json({ message: "client error: invalid user" });

    for (const keywordName in req.body.keywords) {
      const keyword = await Keyword.findOne({
        where: { name: keywordName.name },
      });
      if (!keyword) continue;
      user.addKeyword(keyword);
    }
    //update password
    if (req.body.password) {
      await User.update(
        {
          password: req.body.password,
        },
        {
          where: { id: req.user.id },
        }
      );
    }

    //error if keyword.len >9
    if (req.body.keywords.length > 9)
      res.status(400).json({ message: "client error: keyword over 9" });
    else res.status(200).send("successfully saved");
  } catch (err) {
    console.error(err);
    next(error);
  }
};
