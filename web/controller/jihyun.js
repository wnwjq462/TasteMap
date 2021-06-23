const express = require("express");
const Dining = require("../models/dining");
const Keyword = require("../models/keyword");

const getScore = (score) => {
  if (score == "total") {
    return "totalScore";
  } else if (score == "taste") {
    return "tasteScore";
  } else if (score == "price") {
    return "priceScore";
  } else if (score == "service") {
    return "serviceScore";
  } else if (score == "mood") {
    return "moodScore";
  }
};

const getOffset = (page, user) => {
  const limit = 5;
  let offset = 0;
  let totalNum = 0;
  if (user) {
    try {
      totalNum = user.getDinings.count();
    } catch (err) {
      console.error(err);
      return next(err);
    }
  } else {
    try {
      totalNum = Dining.count();
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
  const lastPage = Math.ceil(totalNum / limit);
  if (page) {
    const pageNum = parseInt(page);
    if (pageNum > lastPage) {
      offset = (lastPage - 1) * limit;
    } else {
      offset = (pageNum - 1) * limit;
    }
  }
  return offset;
};

exports.getDining = (req, res, next) => {
  const offset = getOffset(req.query.page, undefined);
  const score = getScore(req.query.score);
  const keyword = req.query.keyword;
  let dinings;
  try {
    if (keyword) {
      dinings = Dining.findAll({
        include: {
          model: Keyword,
          where: { name: keyword },
        },
        order: [[score, "DESC"]],
        limit: 5,
        offset: offset,
      });
    } else {
      dinings = Dining.findAll({
        include: { model: Keyword },
        order: [[score, "DESC"]],
        limit: 5,
        offset: offset,
      });
    }
    res.json(dinings);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.getUserLike = (req, res, next) => {
  const score = getScore(req.query.score);
  try {
    const user = User.findOne({ where: { id: req.user.id } });
    if (user) {
      const offset = getOffset(req.query.page, user);
      const dinings = user.getDinings({
        include: { model: Keyword },
        order: [[score, "DESC"]],
        limit: 5,
        offset: offset,
      });
      res.json(dinings);
    } else {
      res.status(404).send("사용자가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
