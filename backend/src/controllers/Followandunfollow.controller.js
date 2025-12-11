import User from "../model/register.model.js";

const FollowandUnfollowLogic=async (req,res)=>{
  try {
    const followerId=req.user.id;
    const followId=req.body.followId;
    if(followId=== followerId){
      return res.status(400).json({
        messaage:"You can not follow yourselfe"
      })
    };
    const follower=await User.findById(followerId);
    const targetUser=await User.findById(followId);

    if (!follower || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (follower.Following.includes(followId)) {
      follower.Following.pull(followId);
      targetUser.Followers.pull(followerId);

      await follower.save();
      await targetUser.save();

      return res.json({ message: "Unfollowed successfully", followed: false });
    }

     // ---------- FOLLOW LOGIC ----------
    follower.Following.push(followId);
    targetUser.Followers.push(followerId);

    await follower.save();
    await targetUser.save();

     return res.json({ message: "Followed successfully", followed: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export default FollowandUnfollowLogic;