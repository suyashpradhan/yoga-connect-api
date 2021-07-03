const express = require("express");
const router = express.Router();
const errorHandler = require("../utils/errorHandling.js");
const createToken = require("../utils/createToken.js");
const { User } = require("../models/user.model");

const signUpUser = async (req, res) => {
  const { fullName, email, password, userName } = req.body;

  try {
    const savedUser = await User.create({
      fullName,
      email,
      password,
      userName,
    });
    const token = createToken(savedUser._id);
    res.status(200).json({
      success: true,
      message: "Succesfully signed up.",
      _id: savedUser._id,
      token,
    });
  } catch (error) {
    const errors = errorHandler(error);
    res.status(401).json({ errors });
  }
};

module.exports = { signUpUser };
