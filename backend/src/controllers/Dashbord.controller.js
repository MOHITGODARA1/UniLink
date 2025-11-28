import User from "../model/register.model.js";
const Dashbordcheck=async (req,res)=>{
  try {
    const user=await User.findById(req.user.id).select("-Password")
    res.json({
      sucess:true,
      user
    })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export default Dashbordcheck