import User from "../model/register.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const LoginCheck = async (req, res) => {
  try {
    const { Name, Password } = req.body;

    if (!Name || !Password) {
      return res.status(400).json({
        message: "Fields are required",
        success: false
      });
    }

    const user = await User.findOne({
      $or: [{ UserName: Name }, { Email: Name }]
    });

    if (!user) {
      return res.status(404).json({
        message: "User is not registered",
        success: false
      });
    }

    const PasswordCheck = await bcrypt.compare(Password, user.Password);

    if (!PasswordCheck) {
      return res.status(401).json({
        message: "Password is incorrect",
        success: false
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      data: user,
      token,
      success: true
    });

  } catch (error) {
    console.error("LoginCheck Error:", error.message);

    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message
    });
  }
};

export default LoginCheck;
