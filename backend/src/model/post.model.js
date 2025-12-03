import mongoose from "mongoose";

const PostUplode=new mongoose.Schema({
  
    content:{
      type:String,
      required:true
    },
    authorId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    Collage:{
      type:String,
      required:true
    }
},{timestamps:true});

export default mongoose.model("Post",PostUplode);