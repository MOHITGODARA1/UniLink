import express from "express";
import RegisterUser from "../controllers/registerUser.js";
import LoginCheck from "../controllers/Login.js";
import AuthJwt from "../middlewares/auth.js";
import Dashbordcheck from "../controllers/Dashbord.controller.js";
import User from "../model/register.model.js";
import Search from "../controllers/CollageSearch.controller.js";
import UploadPost from "../controllers/Post.controller.js";
import FetchPost from "../controllers/feed.controller.js";
const router=express.Router();

router.post("/user-Register",RegisterUser);
router.post("/Login",LoginCheck)

//User Dashbord data fetch
router.get("/dashboard",AuthJwt,Dashbordcheck)

router.get('/Search',Search);

router.post("/Skill-Set", async (req, res) => {
  try {
    const { UserName, Skill } = req.body;

    // 1. Validate data
    if (!UserName || !Skill || !Array.isArray(Skill) || Skill.length === 0) {
      return res.status(400).json({
        message: "UserName and Skill array are required",
        success: false,
      });
    }

    // 2. Check user exists
    const user = await User.findOne({ UserName });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // 3. Update the user's skills
    user.Skill = Skill;
    await user.save();

    // 4. Success response
    res.status(200).json({
      message: "Skills updated successfully",
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
});


// Update Post 

router.post("/Uplode-Post",UploadPost);

router.get("/Post-fetch",FetchPost);
export default router;