/**
 * Input validation and sanitization middleware
 * Validates and sanitizes incoming request data
 */

export const validateSignupInput = (req, res, next) => {
  const { UserName, Email, College, Password } = req.body;
  const errors = {};

  // Validate UserName
  if (!UserName) {
    errors.UserName = "Username is required";
  } else if (UserName.length < 3) {
    errors.UserName = "Username must be at least 3 characters";
  } else if (UserName.length > 30) {
    errors.UserName = "Username must not exceed 30 characters";
  } else if (!/^[a-zA-Z0-9_-]+$/.test(UserName)) {
    errors.UserName = "Username can only contain letters, numbers, underscores, and hyphens";
  }

  // Validate Email
  if (!Email) {
    errors.Email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
    errors.Email = "Invalid email format";
  }

  // Validate College
  if (!College) {
    errors.College = "College is required";
  } else if (College.length < 2) {
    errors.College = "College name must be at least 2 characters";
  }

  // Validate Password
  if (!Password) {
    errors.Password = "Password is required";
  } else if (Password.length < 8) {
    errors.Password = "Password must be at least 8 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(Password)) {
    errors.Password = "Password must contain uppercase, lowercase, and numbers";
  }

  // If there are errors, return them
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Sanitize input - trim whitespace
  req.body = {
    UserName: UserName.trim(),
    Email: Email.trim().toLowerCase(),
    College: College.trim(),
    Password,
  };

  next();
};
