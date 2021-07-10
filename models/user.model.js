const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isStrongPassword } = require("validator");
const { Schema } = mongoose;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  userName: {
    type: String,
    required: [true, "User Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
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


//Created User Model
const User = mongoose.model("User", UserSchema);

module.exports = User;
