const User = require("../models/user.model");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt  = require("bcrypt")

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  let user = await User.findOne({ userName });
  if (user) {
    if (bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { _id: user._id, fullName: user.fullName, userName: user.userName },
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ success: true, token });
    } else {
      res.status(401).json({
        success: false,
        message: "UserName and password does not match",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "UserName or password is incorrect",
    });
  }
};

module.exports = { loginUser };