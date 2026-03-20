import User from "../model/register.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const LoginCheck = async (req, res) => {
  try {
    const { Name, Password } = req.body;

    
    if (!Name || !Password) {
      return res.status(400).json({
        success: false,
        message: "Username/Email and Password are required"
      });
    }

    const user = await User.findOne({
      $or: [{ UserName: Name }, { Email: Name }]
    }).select("+Password"); 

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userData = {
      _id: user._id,
      UserName: user.UserName,
      Email: user.Email,
      College: user.Collage
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userData
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export default LoginCheck;