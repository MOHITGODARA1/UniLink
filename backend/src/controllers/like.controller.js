import postModel from "../model/post.model.js";

export const toggleLike = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
      return res.status(400).json({ message: "postId and userId required" });
    }

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.some(id => id.toString() === userId);

    if (isLiked) {
      post.likes.pull(userId);  
    } else {
      post.likes.push(userId);  
    }

    await post.save();

    return res.status(200).json({
      message: isLiked ? "Unliked successfully" : "Liked successfully",
      likesCount: post.likes.length
    });
  } catch (error) {
    console.error("Toggle Like Error:", error);
    return res.status(500).json({
      message: "Failed to toggle like",
      error: error.message
    });
  }
};
