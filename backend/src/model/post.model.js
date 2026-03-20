import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

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

    // MEDIA FIELDS
    mediaUrl: {
      type: String,
      default: null
    },

    mediaPublicId: {
      type: String,
      default: null
    },

    mediaType: {
      type: String,
      enum: ["image", "video", "none"],
      default: "none"
    },


    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

  
    comments: [commentSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
