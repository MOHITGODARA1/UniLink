import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
    Skill:{
      type:[String],
      default:[]
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
