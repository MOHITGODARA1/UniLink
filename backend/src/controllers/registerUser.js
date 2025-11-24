import mongoose from "mongoose";
import User from "../model/register.model.js";

const RegisterUser=async (req,res)=>{
  try {
    const [UserName,Email,Collage,Password]=req.body;
    if(!UserName || !Email || !Collage || !Password){
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    }
  } catch (error) {
    
  }

}