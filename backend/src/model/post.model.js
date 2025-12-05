import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    Collage: {
      type: String,
      required: true
    },

    // ⭐ NEW FIELDS for IMAGE / VIDEO upload
    mediaUrl: {
      type: String, // Cloudinary URL
      default: null
    },

    mediaPublicId: {
      type: String, // Cloudinary public ID (used for delete)
      default: null
    },

    mediaType: {
      type: String,
      enum: ["image", "video", "none"],
      default: "none"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
