const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      require: "Post description cannot be left blank",
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],

    isActive: Boolean,
  },
  { timestamps: true }
);

const Post = new mongoose.model("Post", PostSchema);

module.exports = Post;
