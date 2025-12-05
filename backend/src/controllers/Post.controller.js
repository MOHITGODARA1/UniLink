import postModel from "../model/post.model.js";
import cloudinary from "../utils/cloudnary.js";
import fs from "fs";

const UploadPost = async (req, res) => {
  try {
    const { content, Collage, authorId, mediaType } = req.body;

    if (!authorId || !Collage) {
      return res.status(400).json({
        message: "authorId and Collage are required",
      });
    }

    // ********************************************
    // CASE 1 → NO MEDIA (TEXT-ONLY POST)
    // ********************************************
    if (!req.file) {
      if (!content) {
        return res.status(400).json({
          message: "Post cannot be empty",
        });
      }

      await postModel.create({
        content,
        authorId,
        Collage,
        mediaType: "none",
        mediaUrl: null,
        mediaPublicId: null
      });

      return res.status(200).json({
        message: "Text post uploaded successfully",
      });
    }

    // ********************************************
    // CASE 2 → MEDIA POST (IMAGE OR VIDEO)
    // ********************************************

    // Upload media to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "unilink_posts",
      resource_type: mediaType === "video" ? "video" : "image",
    });

    // Delete temporary file
    fs.unlink(req.file.path, () => {});

    // Save post with media
    await postModel.create({
      content: content || "",
      authorId,
      Collage,
      mediaType: mediaType === "video" ? "video" : "image",
      mediaUrl: uploadResult.secure_url,
      mediaPublicId: uploadResult.public_id
    });

    return res.status(200).json({
      message: "Media post uploaded successfully",
      mediaUrl: uploadResult.secure_url
    });

  } catch (error) {
    console.error("UploadPost Error:", error.message);

    return res.status(500).json({
      message: "Failed to upload post",
      error: error.message,
    });
  }
};

export default UploadPost;
