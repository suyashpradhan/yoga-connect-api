const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isStrongPassword } = require("validator");
const { Schema } = mongoose;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, "User Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: [
      isStrongPassword,
      "Password requirements: Minimum 8 characters long, One Uppercase Character, One Lowercase Character & One Special Character",
    ],
  },
  bio: {
    type: String,
    maxLength: 255,
  },

  website: {
    type: String,
  },

  profile_picture: {
    type: String,
  },

  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  created_at: {
    type: Date,
    default: Date.now,
  },
});

//Middleware after user is created!
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Static method for login
UserSchema.statics.login = async function (email, password) {
  const matchedUser = await this.findOne({ email });

  if (matchedUser) {
    const auth = await bcrypt.compare(password, matchedUser.password);
    if (auth) {
      return matchedUser;
    }
  }
  throw Error("invalid");
};

//Created User Model
const User = mongoose.model("User", UserSchema);

module.exports = { User, UserSchema };
