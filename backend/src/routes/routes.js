import express from "express";
import RegisterUser from "../controllers/registerUser.js";
import LoginCheck from "../controllers/Login.js";
import AuthJwt from "../middlewares/auth.js";
import Dashbordcheck from "../controllers/Dashbord.controller.js";
import User from "../model/register.model.js";
import Search from "../controllers/CollageSearch.controller.js";
import UploadPost from "../controllers/Post.controller.js";
import FetchPost from "../controllers/feed.controller.js";
import fetchUserPosts from "../controllers/UserPost.controller.js";
const router = express.Router();

router.post("/user-Register", RegisterUser);
router.post("/Login", LoginCheck);

// Dashboard
router.get("/dashboard", AuthJwt, Dashbordcheck);

// Search colleges
router.get("/Search", Search);

// Skill Set Update
router.post("/Skill-Set", async (req, res) => {
  try {
    const { UserName, Skill } = req.body;

    if (!UserName || !Skill || !Array.isArray(Skill) || Skill.length === 0) {
      return res.status(400).json({
        message: "UserName and Skill array are required",
        success: false,
      });
    }

    const user = await User.findOne({ UserName });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user.Skill = Skill;
    await user.save();

    return res.status(200).json({
      message: "Skills updated successfully",
      success: true,
      user,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
});

// Create Post
router.post("/Uplode-Post", UploadPost);

// Fetch Posts
router.get("/Post-fetch", FetchPost);

//User Post Fetch
router.get("/fetch-user-posts",fetchUserPosts)

export default router;
