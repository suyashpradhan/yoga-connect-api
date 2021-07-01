const express = require("express");
const router = express.Router();

const {
  fetchUserById,
  getUserDetails,
  addUserDetails,
  fetchAllUsers,
} = require("../controllers/userDetails.controller");

router.route("/fetch-user-details").post(getUserDetails);
router.route("/show-all-users").get(fetchAllUsers);
router.route("/add-user-details").post(fetchUserById, addUserDetails);

module.exports = router;
