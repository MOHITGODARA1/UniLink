import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      sparse: true,
      index: true, // Create index for faster queries
    },

    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      sparse: true,
      index: true, // Create index for faster queries
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Invalid email format",
      },
    },

    Collage: {
      type: String,
      required: true,
      trim: true,
    },

    Password: {
      type: String,
      required: true,
    },

    Skill: {
      type: [String],
      default: []
    },

    Bio: {
      type: String,
      default: ""
    },

    Followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],

    Following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
