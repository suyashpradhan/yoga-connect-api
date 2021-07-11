const User = require("../models/user.model");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    let userData = req.body;
    const usernameExists = await User.exists({ userName: userData.userName });
    const emailExists = await User.exists({ email: userData.email });
    if (usernameExists) {
      res.status(409).json({ success: false, message: "userName is taken." });
      return usernameExists;
    }
    if (emailExists) {
      res
        .status(409)
        .json({ success: false, message: "Email is already registered." });
      return emailExists;
    }
    userData.password = bcrypt.hashSync(userData.password, 10);
    let newUser = new User(userData);
    newUser = await newUser.save();

    res.json({ success: true, message: "Successfully added new user" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to add new user",
      errMessage: err.message,
    });
  }
};

module.exports = { registerUser }