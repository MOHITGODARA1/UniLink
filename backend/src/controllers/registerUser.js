import mongoose from "mongoose";
import User from "../model/register.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const RegisterUser = async (req, res) => {
  try {
    const { UserName, Email, Collage, Password } = req.body;

    if (!UserName || !Email || !Collage || !Password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check if email or username already exists
    const exist = await User.findOne({
      $or: [{ Email }, { UserName }]
    });

    if (exist) {
      return res.status(400).json({
        message: "User already exists",
        field: exist.Email === Email ? "email" : "username",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(Password, 10);

    await User.create({
      UserName,
      Email,
      Collage,
      Password: hashPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });

  } catch (error) {
    console.error("RegisterUser Error:", error.message);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export default RegisterUser;
