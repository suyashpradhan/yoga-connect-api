const { User } = require("../models/user.model");

const userFollowers = async (req, res) => {
  try {
    let { user } = req;
    const { loggedInUserId } = req.body;
    user = await User.findOne({ _id: user._id });
    const loggedInUser = await User.find({ _id: loggedInUserId });

    if (
      user.following.includes(loggedInUserId) ||
      loggedInUser.followers.includes(user._id)
    ) {
      user.following = user.following.filter(
        (data) => data._id.toString() !== loggedInUserId.toString()
      );
      loggedInUser.followers = loggedInUser.followers.filter(
        (data) => data._id.toString() !== user._id.toString()
      );
    } else {
      user.following.push(loggedInUserId);
      loggedInUser.followers.push(user._id);
    }

    user = await user.save();
    loggedInUser = await loggedInUser.save();
    res.status(200).json({ success: true, user, loggedInUser });
  } catch (e) {
    res.status(500).json({ success: false, message: "Something Went Wrong" });
  }
};

module.exports = { userFollowers };
