const User = require("../models/user.model");
const express = require("express");
const { extend } = require("lodash");

const fetchAllUsers = async (req, res) => {
  try {
    let users = await User.find({});
     users = users.map((user) => {
      user.password = null;
      return user;
    });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to get the list of all users",
      errMessage: err.message,
    });
  }
};

const updateUserDetails = async (req, res) => {
  let { user } = req;
  user = await User.findOne({ _id: user._id });
  const  userUpdateBody = req.body;
  
  const userNameExists = await User.findOne({
    userName: userUpdateBody.userName,
  });
  if (userNameExists) {
    return res.status(403).json({
      success: false,
      message:
        "UserName updation failed. Another user exists with the same userName.",
    });
  }
  
  const emailAddressExists = await User.findOne({ email: userUpdateBody.email });
  if (emailAddressExists) {
    return res.status(403).json({
      success: false,
      message:
        "Email updation failed. Another user exists with the same email.",
    });
  }
  user = extend(user, userUpdateBody);
  user = await user.save();
  user.password = null;
  res.json({ success: true, user });
};

module.exports = {
  fetchAllUsers,
  updateUserDetails,
};
