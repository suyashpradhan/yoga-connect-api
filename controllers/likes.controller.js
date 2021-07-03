const fetchLikedUser = async (req, res) => {
  const { post } = req;

  try {
    let users = await post
      .populate({ path: "likes" })
      .select("userName")
      .execPopulate();
    res
      .status(200)
      .json({ success: true, message: "Fetched all users", users });
  } catch (e) {
    res
      .status(500)
      .json({ success: true, message: "Failed to load users", users });
  }
};

const likePost = async (req, res) => {
  try {
    let { post, user } = req;
    if (post.likes.includes(user._id)) {
      post.likes.filter((post) => post != user._id);
    } else {
      post.likes.push(user._id);
    }
    post = await post.save();
    res.status(200).json({ success: true, message: "Post Liked", post });
  } catch (e) {
    res.status(200).json({ success: true, message: "Failed to like post" });
  }
};

module.exports = { fetchLikedUser, likePost };
