const User = require("../models/user.model");
const Post = require("../models/post.model");
const express = require("express");

const fetchUserById = async (req, res) => {
  let { user } = req;
  user = await User.findOne({ _id: user._id });
  user.password = null;
  res.json({ success: true, user });
};

const fetchPostById = async (req, res, next, postId) => {
  let post = await Post.findOne({ _id: postId, isActive: true });
  if (!post) {
    res.status(500).json({ success: false, message: "Post Doesn't Exists" });
  }
  req.post = post;
  next();
};

module.exports = { fetchUserById, fetchPostById }