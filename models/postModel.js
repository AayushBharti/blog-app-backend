const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: [
    {
      // arrays of likes
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like", //ref to Like model
    },
  ],
  comments: [
    {
      // arrays of comments
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
