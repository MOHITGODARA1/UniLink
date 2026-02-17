import User from "../model/register.model.js";
const Dashbordcheck = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const user = await User.findById(userId).select("-Password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Dashboard Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default Dashbordcheck;