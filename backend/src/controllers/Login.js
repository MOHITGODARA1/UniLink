
import User from "../model/register.model.js";
import bcrypt from "bcrypt"
const LoginCheck=async (req,res)=>{
  try {
    const {Name,Password}=req.body;
    if(!Name || !Password){
      return res.status(400).json({
        message:"Field are required",
        success:false
      })
    }
    const user=await User.findOne({
      $or:[{UserName:Name},{Email:Name}]
    });
    if(!user){
      return res.status(404).json({
        message:"User is not register",
        success:false
      })
    }
    const PasswordCheck= await bcrypt.compare(Password,user.Password);
    if(!PasswordCheck){
      return res.status(401).json({
        message:"Password is incorrect",
        success:false
      });
    }
    return res.status(200).json({
      message: "Login successful",
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
}

export default LoginCheck