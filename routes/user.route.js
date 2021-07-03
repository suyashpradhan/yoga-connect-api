const express = require("express");
const { userFollowers } = require("../controllers/followers.controller");
const { signInUser } = require("../controllers/signIn.controller");
const { signUpUser } = require("../controllers/signUp.controller");
const {
  fetchAllUsers,
  getUserById,
  updateUserDetails,
} = require("../controllers/user.controller");
const authValidator = require("../middlewares/authValidator.middleware");
const router = express.Router();

router.route("/users").get(fetchAllUsers);
router.route("/login").post(signInUser);
router.route("/register").post(signUpUser);
router.use(authValidator);

router.route("/").get(getUserById).post(updateUserDetails).put(userFollowers);

module.exports = router;
