import postModel from "../model/post.model.js";

export const addComment = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;

    if (!postId || !userId || !text) {
      return res.status(400).json({ message: "postId, userId and text required" });
    }

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ userId, text });

    await post.save();

    const populatedPost = await postModel
      .findById(postId)
      .populate("comments.userId", "UserName ProfilePic");

    return res.status(200).json({
      message: "Comment added successfully",
      comments: populatedPost.comments
    });

  } catch (error) {
    console.error("Add Comment Error:", error);
    return res.status(500).json({
      message: "Failed to add comment",
      error: error.message
    });
  }
};
