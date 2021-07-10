const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authValidator = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, errorMessage: "Unauthorized. Token not passed." });
    }
    token = token.split(" ")[1];
    const decodedValue = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id: decodedValue._id });
    if (!user) {
      return res.status(401).json({ success: false, errorMessage: "Unauthorized. Either user is not registered or Token is invalid." });
    }
    req.user = { _id: decodedValue._id, fullName: decodedValue.fullName };
    next();
  }
  catch (error) {
    res.status(401).json({ success: false, errMessage: error.message });
  }

}

module.exports = authValidator;