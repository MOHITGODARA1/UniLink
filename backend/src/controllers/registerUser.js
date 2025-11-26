import mongoose from "mongoose";
import User from "../model/register.model.js";
import bcrypt, { hash } from "bcrypt";
const RegisterUser=async (req,res)=>{
  try {
    const {UserName,Email,Collage,Password}=req.body;
    if(!UserName || !Email || !Collage || !Password){
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    }
    const exist=await User.findOne({Email,UserName});
    if(exist){
      return res.status(400).json({
        message:"User is already exist",
        success:false
      })
    }
    const hashPassword=await bcrypt.hash(Password,10);
    const newUser=await User.create({
      UserName,
      Email,
      Collage,
      Password:hashPassword,
    });
    return res.status(201).json({
      message:"User register Successfully",
      success:true
    })

  } catch (error) {
    res.status(500).json({
      message:error.message,
      success:false
    })
  }
}

export default RegisterUser