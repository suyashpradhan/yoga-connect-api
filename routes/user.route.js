const express = require("express");
const router = express.Router();
const authValidator = require("../middlewares/authValidator.middleware");
const {
  fetchAllUsers,
  updateUserDetails,
} = require("../controllers/user.controller");

const { registerUser } = require("../controllers/registerUser.controller")
const { loginUser } = require("../controllers/loginUser.controller")
const { fetchUserById } = require("../controllers/paramHandlers.controller")
const { userFollowers } = require("../controllers/followers.controller")

router.route("/all").get(fetchAllUsers);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.use(authValidator);
router.route("/").get(fetchUserById).post(updateUserDetails).put(userFollowers);

module.exports = router;
