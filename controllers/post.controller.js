const Post = require("../models/post.model");
const express = require("express")

const fetchAllPosts = async (req, res) => {
  try {
    let posts = await Post.find();
    const fetchedPosts = posts.filter((post) => post.isActive);
    res.status(200).json({
      success: true,
      message: "Succesfully Fetched All Posts",
      posts: fetchedPosts,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to load posts",
      fetchedPosts,
    });
  }
};

const addNewPost = async (req, res) => {
  try {
    const { user } = req;
    const postData = req.body;
    let newPost = new Post(postData);
    newPost.userId = user._id;
    newPost.isActive = true;
    newPost = await newPost.save();
    res.status(201).json({
      success: true,
      message: "Added New Post",
      post: newPost,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to add post ",
    });
  }
};

const deletePost = async (req, res) => {
  const { _id } = req.body;
  try {
    const postById = await Post.findByIdAndDelete({ _id });

    if (!postById) {
      res.status(500).json({ success: false, message: "Post Doesn't Exists" });
    } else {
      const savedPostId = await Post.save();
      res
        .status(200)
        .json({ success: false, message: "Post Deleted", savedPostId });
    }
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to delete post" });
  }
};

module.exports = { fetchAllPosts, addNewPost, deletePost };
