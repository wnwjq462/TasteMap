const express = require("express");
const { render } = require("nunjucks");

const Dining = require("../models/dining");

const Keyword = require("../models/keyword");

const User = require("../models/user");

// POST /user/like/{diningId}

exports.postUserLike = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });

    if (user) {
      const dining = await Dining.findOne({
        where: { id: req.params.diningId },
      });

      await user.addDining(dining);
      res.status(200).json({ message: "저장 성공" });
    } else {
      res.status(404).json({ message: "유저 정보가 존재 하지 않습니다." });
    }
  } catch (err) {
    console.error(err);

    return next(err);
  }
};

// DELETE /user/like/{diningId}

exports.deleteUserLike = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });

    if (user) {
      const dining = await Dining.findOne({
        where: { id: req.params.diningId },
      });

      await user.removeDinings(dining);
      res.status(200).json({ message: "삭제 성공" });
    } else {
      res.status(404).json({ message: "유저 정보가 존재 하지 않습니다." });
    }
  } catch (err) {
    console.error(err);

    return next(err);
  }
};

// GET /user/keyword

exports.getUserKeyword = async (req, res, next) => {
  res.status(200).render("interest_keyword");
  /*
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });

    if (user) {
      const keywords = await user.getKeywords({
        attributes: ["name"],
      });

      res.status(200).json(keywords);
    } else {
      res.status(404).send("User not found!");
    }
  } catch (err) {
    console.error(err);

    return next(err);
  }
  */
};

// GET /keyword

exports.getKeyword = (req, res, next) => {
  res.send("This is Keyword Page");
};
