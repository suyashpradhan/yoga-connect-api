const jwt = require("jsonwebtoken");
require("dotenv").config();

const maxAge = 1 * 24 * 60 * 60;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

module.exports = createToken;
