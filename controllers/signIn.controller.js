const express = require("express");
const { User } = require("../models/user.model");
const errorHandler = require("../utils/errorHandling.js");
const createToken = require("../utils/createToken.js");
const router = express.Router();

const signInUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.login(userName, password);
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "LoggedIn Successfully",
      _id: user._id,
      token: token,
    });
  } catch (error) {
    const errors = errorHandler(error);
    res.status(400).json({ success: false, errors });
  }
};

module.exports = { signInUser };
