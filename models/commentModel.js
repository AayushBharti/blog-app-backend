const mongoose = require("mongoose");

//router handler
const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId, //Id type
    ref: "Post", //reference to the post model
  },
  user: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Comment",commentSchema);