const express = require("express");
const router = express.Router();
const {
  fetchAllPosts,
  addNewPost,
  deletePost,
} = require("../controllers/post.controller");
const { fetchPostById } = require("../controllers/paramHandlers.controller")
const { fetchLikedUser, likePost } = require("../controllers/likes.controller");

router.route("/").get(fetchAllPosts).post(addNewPost).put(deletePost);
router.param("postId", fetchPostById);
router.route("/:postId/like").get(fetchLikedUser).post(likePost);

module.exports = router;
