const express = require("express");

exports.postUserLike = (req, res, next) => {};

exports.deleteUserLike = (req, res, next) => {};

exports.getUserKeyword = (req, res, next) => {
  res.send("User Keyword Page");
};

exports.getKeyword = (req, res, next) => {
  res.send("Keyword Page");
};
