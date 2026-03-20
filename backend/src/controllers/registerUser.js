import User from "../model/register.model.js";
import bcrypt from "bcrypt";
import { logger } from "../utils/logger.js";

const RegisterUser = async (req, res) => {
  const start = Date.now();
  const requestId = Math.random().toString(36).substring(7);

  try {
    const { UserName, Email, College, Password } = req.body;

    logger.debug(`[${requestId}] Signup request`, { Email });

    // ⚡ Hash password (keep low cost for performance)
    const hashedPassword = await bcrypt.hash(Password, 6);

    // ⚡ DIRECT INSERT (NO PRE-CHECK QUERY)
    const newUser = await User.create({
      UserName,
      Email,
      Collage: College,
      Password: hashedPassword,
    });

    logger.info(`[${requestId}] User created`, {
      userId: newUser._id,
      duration: `${Date.now() - start}ms`,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      code: "SIGNUP_SUCCESS",
      data: {
        userId: newUser._id,
        userName: newUser.UserName,
        email: newUser.Email,
      },
    });

  } catch (error) {
    // ✅ HANDLE DUPLICATE (ONLY HERE)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];

      logger.warn(`[${requestId}] Duplicate key`, { field });

      return res.status(409).json({
        success: false,
        message: `${field} already registered`,
        field: field.toLowerCase(),
        code: "DUPLICATE_KEY",
      });
    }

    logger.error(`[${requestId}] Error`, {
      message: error.message,
      duration: `${Date.now() - start}ms`,
    });

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_ERROR",
    });
  }
};

export default RegisterUser;