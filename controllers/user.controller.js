const User = require("../models/user.model");
const express = require("express");
const { extend } = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    let users = await User.find({});
     users = users.map((user) => {
      user.password = undefined;
      return user;
    });
    console.log(users)
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to get the list of users",
      errMessage: err.message,
    });
  }
};

const findUser = async (req, res) => {
  const { userName, password } = req.body;
  let user = await User.findOne({ userName });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { _id: user._id, fullName: user.fullName, userName: user.userName },
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ success: true, token });
    } else {
      res.status(401).json({
        success: false,
        message: "userName and password does not match",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "userName or password is incorrect",
    });
  }
};

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

const getUserById = async (req, res) => {
  let { user } = req;
  user = await User.findOne({ _id: user._id });
  user.password = undefined;
  res.json({ success: true, user });
};

const updateUser = async (req, res) => {
  let { user } = req;
  user = await User.findOne({ _id: user._id });
  const userUpdates = req.body;
  const userWithSameUsername = await User.findOne({
    userName: userUpdates.userName,
  });
  if (userWithSameUsername) {
    return res.status(403).json({
      success: false,
      message:
        "userName updation failed. Another user exists with the same userName.",
    });
  }
  const userWithSameEmail = await User.findOne({ email: userUpdates.email });
  if (userWithSameEmail) {
    return res.status(403).json({
      success: false,
      message:
        "Email updation failed. Another user exists with the same email.",
    });
  }
  user = extend(user, userUpdates);
  user = await user.save();
  user.password = undefined;
  res.json({ success: true, user });
};



module.exports = {
  getUsers,
  updateFollowers,
  registerUser,
  findUser,
  getUserById,
};
