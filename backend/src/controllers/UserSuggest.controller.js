import User from "../model/register.model.js";
import postModel from "../model/post.model.js";  // <-- Add your Post model

// ------------------ SUGGESTION CONTROLLER ------------------
const Suggestion = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get logged-in user's details
    const loggedUser = await User.findById(userId);

    if (!loggedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch users from same college except logged-in user
    const users = await User.find({
      _id: { $ne: userId },
      Collage: loggedUser.Collage
    })
      .select("UserName avatar Collage Followers Following")
      .limit(5);

    // Return ARRAY only
    res.json(users);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching suggestions" });
  }
};



// ------------------ USER PROFILE CONTROLLER ------------------
const UserProfile = async (req, res) => {
  try {
    const UserId = req.params.id;

    const Detail = await User.findById(UserId)
      .select("UserName Collage Skill Email avatar Followers Following");

    if (!Detail) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add follower & following count
    const responseData = {
      ...Detail._doc,
      followersCount: Detail.Followers?.length || 0,
      followingCount: Detail.Following?.length || 0
    };

    res.json(responseData);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};



// ------------------ FETCH USER POSTS CONTROLLER ------------------
const UserPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await postModel
      .find({ authorId: userId })
      .sort({ createdAt: -1 })
      .select("content mediaUrl mediaType createdAt authorId");

    res.json(posts);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching user posts" });
  }
};


export { Suggestion, UserProfile, UserPosts };
