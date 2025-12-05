import User from "../model/register.model.js";

const Dashbordcheck = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-Password");

    return res.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Dashboard Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export default Dashbordcheck;
