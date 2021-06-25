const express = require("express");
const Dining = require("../models/dining");
const Keyword = require("../models/keyword");
const User = require("../models/user");

// 'score' query string 파싱
const getScore = (score) => {
  if (score === "total") {
    return "totalScore";
  } else if (score === "taste") {
    return "tasteScore";
  } else if (score === "price") {
    return "priceScore";
  } else if (score === "service") {
    return "serviceScore";
  } else if (score === "mood") {
    return "moodScore";
  } else {
    return "totalScore";
  }
};

// page offset 계산
const getOffset = async (page, user) => {
  const limit = 6;
  let offset = 0;
  let totalNum = 0;
  let pageNum = 0;

  if (user) {
    // /user/like
    try {
      let dinings = await user.getDinings();
      totalNum = dinings.length;
    } catch (err) {
      console.error(err);
      return next(err);
    }
  } else {
    // /dining
    try {
      totalNum = await Dining.count();
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  // 마지막 페이지 계산
  const lastPage = Math.ceil(totalNum / limit);

  if (page) {
    pageNum = parseInt(page);
  }

  // offset 계산
  if (pageNum > lastPage) {
    // 마지막 페이지보다 크면 마지막 페이지로
    offset = (lastPage - 1) * limit;
  } else {
    // 첫번째 페이지보다 작으면 첫번째 페이지로
    if (pageNum > 1) {
      offset = (pageNum - 1) * limit;
    }
  }
  return offset;
};

// /dining
exports.getDining = async (req, res, next) => {
  const offset = await getOffset(req.query.page, undefined);
  const score = await getScore(req.query.score);
  const keyword = req.query.keyword;
  let dinings;
  let keywordValue = [{ name: keyword }];
  let scoreValue = [{ name: req.query.score }];
  let pageValue = [{ name: req.query.page }];

  try {
    if (keyword) {
      dinings = await Dining.findAll({
        include: {
          model: Keyword,
          where: { name: keyword },
        },
        order: [[score, "DESC"], ["id"]],
        limit: 6,
        offset: offset,
      });
    } else {
      dinings = await Dining.findAll({
        include: { model: Keyword },
        order: [[score, "DESC"], ["id"]],
        limit: 6,
        offset: offset,
      });
    }
    if (!req.query.keyword || !req.query.score) {
      res.status(200).render("main", {
        diningList: dinings,
        keywords: keywordValue,
        scores: scoreValue,
        pages: pageValue,
      });
    } else {
      res.status(200).json({
        diningList: dinings,
        keywords: keywordValue,
        scores: scoreValue,
        pages: pageValue,
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// /user/like
exports.getUserLike = async (req, res, next) => {
  const score = await getScore(req.query.score);

  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      const offset = await getOffset(req.query.page, user);
      const dinings = await Dining.findAll({
        include: [
          { model: Keyword },
          {
            model: User,
            where: { id: req.user.id },
            attributes: [],
          }
        ],
        order: [[score, "DESC"], ["id"]],
        limit: 6,
        offset: offset,
      });
      res.status(200).json(dinings);
    } else {
      res.status(404).send("사용자가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
