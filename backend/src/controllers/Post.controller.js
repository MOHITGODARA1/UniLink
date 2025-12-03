import postModel from "../model/post.model.js";

const UploadPost = async (req, res) => {
  try {
    const { content, Collage, authorId } = req.body; // 👈 Take authorId from body

    if (!content || !authorId || !Collage) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    await postModel.create({
      content,
      authorId,
      Collage,
    });

    res.status(200).json({
      message: "Post uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error.message);

    res.status(500).json({
      message: "Failed to upload post",
      error: error.message,
    });
  }
};

export default UploadPost;
