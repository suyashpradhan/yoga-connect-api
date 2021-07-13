const User = require("../models/user.model");

const userFollowers = async (req, res) => {
  try {
    let { user } = req;
    const { viewerId } = req.body;
    user = await User.findOne({ _id: user._id });
    let viewer = await User.findOne({ _id: viewerId });
    console.log(viewer);

    if (
      user.following.includes(viewerId) ||
      viewer.followers.includes(user._id)
    ) {
      user.following = user.following.filter(
        (data) => data._id.toString() !== viewerId.toString()
      );
      viewer.followers = viewer.followers.filter(
        (data) => data._id.toString() !== user._id.toString()
      );
    } else {
      user.following.push(viewerId);
      viewer.followers.push(user._id);
    }

    user = await user.save();
    viewer = await viewer.save();
    res.status(200).json({ success: true, user, viewer });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to update user followers/following",
      errMessage: err.message,
    });
  }
};

module.exports = { userFollowers };
