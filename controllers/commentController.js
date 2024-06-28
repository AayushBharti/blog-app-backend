//import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//business logic
exports.createComment = async (req, res) => {
  try {
    //fetch the data form req. body
    const { post, user, body } = req.body;
    //create a comment object
    const comment = new Comment({
      post,
      user,
      body,
    });

    //save the new comment into the database
    //save() alternative of create()
    const savedComment = await comment.save();

    //the new comment created, should be added to the post comment also
    //find the post by Id, add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      //pushing the new comment into the post's comments array
      { new: true }
      //using new:true fn will return the updated doc otherwise older
    )
      .populate("comments")
      //populate the comments array with comment documents
      //without pupulate() and exec() only ids will be added
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      error: "error while creating comment",
    });
  }
};
