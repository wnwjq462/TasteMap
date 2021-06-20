const express = require("express");
const User = require("../models/user");

exports.getUser = (req, res, next) => {
  res.send("User info page");
};

exports.postUser = (req, res, next) => {};
