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
import { Suggestion, UserProfile, UserPosts } from "../controllers/UserSuggest.controller.js";
import FollowandUnfollowLogic from "../controllers/Followandunfollow.controller.js";
import multer from "multer";
import {
  uploadPdf,
  getAllPdfs,
  getPdf,
  deletePdf,
} from "../controllers/study.controller.js";
import { toggleLike } from "../controllers/like.controller.js";
import { addComment } from "../controllers/comment.controller.js";
import UpdateProfile from "../controllers/updateProfile.controller.js";
const router = express.Router();
const upload = multer({ dest: "uploads/" });


router.post("/user-Register", RegisterUser);
router.post("/Login", LoginCheck);

// Dashboard
router.get("/dashboard", Dashbordcheck);

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
router.post("/Uplode-Post", upload.single("media"), UploadPost);

// Fetch Posts
router.get("/Post-fetch", FetchPost);

//User Post Fetch
router.get("/fetch-user-posts",fetchUserPosts)

//Fetch SUggestion for follow
router.get("/Suggestion-User/:userId", Suggestion);
router.get("/user-profile/:id", UserProfile);
router.get("/user-posts/:id", UserPosts);

//Follow and unfollow Logic
router.post("/follow-unfollow", AuthJwt, FollowandUnfollowLogic);

//Like and comment
router.post("/toggle-like", toggleLike);
router.post("/add-comment", addComment);
//Update profile
router.post("/update-profile", UpdateProfile);

// Multer for PDF upload


router.post("/study/upload", upload.single("pdf"), uploadPdf);
router.get("/study/all", getAllPdfs);
router.get("/study/pdf/:id", getPdf);
router.delete("/study/delete/:id", deletePdf);
export default router;
