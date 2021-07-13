const likePost = async (req, res) => {
  try {
    let { post, user } = req;
    if (post.likes.includes(user._id)) {
      post.likes = post.likes.filter((data) => data != user._id);
    } else {
      post.likes.push(user._id);
    }
    post = await post.save();
    res.status(200).json({ success: true, message: "Post Liked", post });
  } catch (e) {
    res.status(500).json({ success: true, message: "Failed to like post" });
  }
};


module.exports = { likePost };
