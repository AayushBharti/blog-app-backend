//import model
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    //save() the new like into the database (applied on objects)
    const savedLike = await like.save();

    //the new like created, should be added to the post like also
    //find the post by Id, add the new like to its likes array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      //pushing the new like into the post's likes array
      { new: true }
      //using new:true fn will return the updated doc otherwise older
    )
      .populate("likes")
      .exec();
    //populate adds the data of ids who liked (not just its id)
    //without pupulate() and exec() only ids will be added

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    return res.status(400).json({
      error: "error while liking post",
    });
  }
};

//unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    //find and delete the like collection me se
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

    //update the post collection
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { new: true }
    );
    //pulling the like from the post,s likes array

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "error while unliking post",
    });
  }
};
