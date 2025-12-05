import postModel from "../model/post.model.js";

export const fetchUserPosts = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const posts = await postModel
      .find({ authorId: userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "User posts fetched successfully",
      posts,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch user posts",
      error: error.message,
    });
  }
};
export default fetchUserPosts
