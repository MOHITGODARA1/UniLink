import User from "../model/register.model.js";
import postModel from "../model/post.model.js";  

const Suggestion = async (req, res) => {
  try {
    const userId = req.params.userId;

    const loggedUser = await User.findById(userId);

    if (!loggedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const users = await User.find({
      _id: { $ne: userId },
      Collage: loggedUser.Collage
    })
      .select("UserName avatar Collage Followers Following")
      .limit(5);

 
    res.json(users);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching suggestions" });
  }
};


const UserProfile = async (req, res) => {
  try {
    const UserId = req.params.id;

    const Detail = await User.findById(UserId)
      .select("UserName Collage Skill Email avatar Followers Following");

    if (!Detail) {
      return res.status(404).json({ message: "User not found" });
    }

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
