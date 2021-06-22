const express = require("express");

exports.getDining = (req, res, next) => {
  res.send("Dining page");
};

exports.getUserLike = (req, res, next) => {
  res.send("User Like page");
};
