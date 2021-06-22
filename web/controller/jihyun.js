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

exports.getDining = (req, res, next) => {
  const score = getScore(req.query.score);
  const keyword = req.query.keyword;
  try {
    if (keyword) {
      const dinings = Dining.findAll({
        include: {
          model: Keyword,
          where: { name: keyword },
        },
        order: [[score, "DESC"]],
        limit: 5,
      });
      res.json(dinings);
    } else {
      const dinings = Dining.findAll({
        order: [[score, "DESC"]],
        limit: 5,
      });
      res.json(dinings);
    }
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

exports.getUserLike = (req, res, next) => {
  
};
