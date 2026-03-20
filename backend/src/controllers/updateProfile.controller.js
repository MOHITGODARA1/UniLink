import User from "../model/register.model.js";
import bcrypt from "bcrypt";

const UpdateProfile = async (req, res) => {
  try {
    const { userId, UserName, Email, Bio, OldPassword, NewPassword } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

   
    if (UserName && UserName !== user.UserName) {
      const exists = await User.findOne({ UserName });
      if (exists) {
        return res.status(400).json({ message: "Username already taken" });
      }
      user.UserName = UserName;
    }

   
    if (Email && Email !== user.Email) {
      const exists = await User.findOne({ Email });
      if (exists) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.Email = Email;
    }

   
    if (Bio !== undefined) {
      user.Bio = Bio;
    }

   
    if ((OldPassword && !NewPassword) || (!OldPassword && NewPassword)) {
      return res.status(400).json({
        message: "Both old and new password required to update password",
      });
    }

    if (OldPassword && NewPassword) {
      const isMatch = await bcrypt.compare(OldPassword, user.Password);
      if (!isMatch)
        return res.status(400).json({ message: "Old password incorrect" });

      user.Password = await bcrypt.hash(NewPassword, 10);
    }

    await user.save();

    return res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export default UpdateProfile;
