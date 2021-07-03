const { User } = require("../models/user.model");
const { extend } = require("lodash");

const fetchAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    users = users.map((user) => {
      return user;
    });
    res.status(200).json({ success: true, users });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch list of users" });
  }
};

const getUserById = async (req, res) => {
  let { user } = req;
  try {
    user = await User.findOne({ _id: user._id });
    res.status(200).json({ success: true, message: "User Found" });
  } catch (e) {
    res.status(500).json({ success: false, message: "Something Went Wrong" });
  }
};

const updateUserDetails = async (req, res) => {
  let { user } = req;
  user = await User.findOne({ _id: user._id });
  const userDetails = req.body;
  const userWithUsername = await User.findOne({
    username: userDetails.username,
  });
  if (userWithUsername) {
    return res.status(403).json({
      success: false,
      message: "Updation Failed",
    });
  }
  const userWithEmail = await User.findOne({ email: userDetails.email });
  if (userWithEmail) {
    return res.status(403).json({
      success: false,
      message:
        "Email updation failed. Another user exists with the same email.",
    });
  }
  user = extend(user, userDetails);
  user = await user.save();
  user.password = undefined;
  res.json({ success: true, user });
};

module.exports = { fetchAllUsers, getUserById, updateUserDetails };
