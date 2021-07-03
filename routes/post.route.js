const express = require("express");
const { fetchLikedUser, likePost } = require("../controllers/likes.controller");
const router = express.Router();

const {
  fetchAllPosts,
  addNewPost,
  deletePost,
  fetchPostById,
} = require("../controllers/post.controller");

router.route("/").get(fetchAllPosts).post(addNewPost).put(deletePost);

router.param("postId", fetchPostById);

router.route("/:postId/like").get(fetchLikedUser).post(likePost);

module.exports = router;
