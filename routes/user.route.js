const express = require("express");
const router = express.Router();
const authValidator = require("../middlewares/authValidator.middleware");
const {
  getUsers,
  registerUser,
  findUser,
  getUserById,
  updateUser,
} = require("../controllers/user.controller");

router.route("/all").get(getUsers);

router.route("/login").post(findUser);

router.route("/register").post(registerUser);

router.use(authValidator);

router.route("/").get(getUserById).post(updateUser);

module.exports = router;
