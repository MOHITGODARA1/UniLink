import postModel from "../model/post.model.js";

const FetchPost = async (req, res) => {
  try {
    const { Collage } = req.query;

    if (!Collage) {
      return res.status(400).json({
        message: "Collage name is required",
      });
    }

    const posts = await postModel
      .find({ Collage })
      .populate("authorId", "UserName Email Collage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Fetched all posts successfully",
      posts,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};

export default FetchPost;
