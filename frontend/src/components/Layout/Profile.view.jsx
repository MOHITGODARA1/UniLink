import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UpperNavbar from "../UI/UpperNavbar";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function ProfileView() {
  const { id } = useParams(); // visited user
  const loggedInUser = localStorage.getItem("userId");
  const token = localStorage.getItem("Token");

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  // NEW STATES for comments/likes
  const [openComments, setOpenComments] = useState({});
  const [commentText, setCommentText] = useState({});

  // ---------------- FETCH USER & POSTS ----------------
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/user-profile/${id}`);
      setUser(res.data);

      const postsRes = await axios.get(`${import.meta.env.VITE_API}/user-posts/${id}`);
      setPosts(postsRes.data);

      setIsFollowing(res.data.Followers?.includes(loggedInUser));
    } catch (error) {
      console.log("Profile fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  if (!user) {
    return <p className="text-white p-4 text-center">Loading profile...</p>;
  }

  // ---------------- LIKE HANDLER ----------------
  const handleLike = async (postId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/toggle-like`, {
        postId,
        userId: loggedInUser,
      });

      const likesCount = res.data.likesCount;

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? {
                ...p,
                likes:
                  p.likes?.includes(loggedInUser)
                    ? p.likes.filter((uid) => uid !== loggedInUser)
                    : [...p.likes, loggedInUser],
              }
            : p
        )
      );
    } catch (error) {
      console.log("Like error:", error);
    }
  };

  // ---------------- COMMENT HANDLER ----------------
  const handleAddComment = async (postId) => {
    if (!commentText[postId] || commentText[postId].trim() === "") return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/add-comment`, {
        postId,
        userId: loggedInUser,
        text: commentText[postId],
      });

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, comments: res.data.comments } : p
        )
      );

      setCommentText((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.log("Comment error:", error);
    }
  };

  // ---------------- FOLLOW / UNFOLLOW ----------------
  const handleFollow = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/follow-unfollow`,
        { followId: id },
        { headers: { authorization: token } }
      );

      const followed = res.data.followed;
      setIsFollowing(followed);

      setUser((prev) => ({
        ...prev,
        Followers: followed
          ? [...(prev.Followers || []), loggedInUser]
          : prev.Followers.filter((uid) => uid !== loggedInUser),
      }));
    } catch (err) {
      console.log("Follow Error:", err);
    }
  };

  return (
    <>
      <UpperNavbar />

      <div className="w-full min-h-screen bg-black px-4 md:px-6 py-8 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">

          {/* ---------------- LEFT: PROFILE INFO ---------------- */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">

            {/* PROFILE CARD */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col items-center">
                <img
                  src={user.ProfilePic || "/Profile.photo.5.jpg"}
                  className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover shadow-lg"
                />

                <h1 className="text-xl text-white font-semibold mt-3">{user.UserName}</h1>
                <p className="text-gray-400 text-xs">{user.Email}</p>
                <p className="text-purple-300 text-xs">{user.Collage}</p>

                <p className="text-gray-400 text-xs mt-3 text-center">
                  {user.Bio || "No bio added yet."}
                </p>

                <button
                  onClick={handleFollow}
                  className={`mt-4 px-4 py-1.5 rounded-full text-xs font-medium text-white ${
                    isFollowing ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-500"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </div>

            {/* STATS */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-4 shadow-xl">
              <h3 className="text-gray-300 text-xs font-semibold mb-3">Stats</h3>

              <div className="flex justify-between">
                <div className="text-center flex-1">
                  <p className="text-white text-lg font-bold">{user.Followers?.length || 0}</p>
                  <p className="text-gray-400 text-xs">Followers</p>
                </div>

                <div className="h-10 w-px bg-gray-800 mx-2" />

                <div className="text-center flex-1">
                  <p className="text-white text-lg font-bold">{user.Following?.length || 0}</p>
                  <p className="text-gray-400 text-xs">Following</p>
                </div>
              </div>
            </div>

            {/* SKILLS */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-4 shadow-xl">
              <h3 className="text-gray-300 text-xs font-semibold mb-3">Skills</h3>

              <div className="flex flex-wrap gap-2">
                {user.Skill?.length ? (
                  user.Skill.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 text-[11px] border border-gray-700 bg-white/5 text-blue-300 rounded-full"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs">No skills</p>
                )}
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT: USER POSTS ---------------- */}
          <div className="w-full md:w-2/3">
            <h2 className="text-xl text-white mb-3 font-semibold">Posts by {user.UserName}</h2>

            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-5 shadow-lg"
                >
                  {/* HEADER */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={user.ProfilePic || "/Profile.photo.5.jpg"}
                      className="w-9 h-9 rounded-full border border-gray-700"
                    />
                    <div>
                      <p className="text-sm text-white font-semibold">{user.UserName}</p>
                      <p className="text-[11px] text-gray-400">{user.Collage}</p>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <p className="text-gray-300 text-sm whitespace-pre-line">{post.content}</p>

                  {/* MEDIA */}
                  {post.mediaUrl && (
                    <div className="mt-3">
                      {post.mediaType === "video" ? (
                        <video
                          src={post.mediaUrl}
                          controls
                          className="w-full rounded-xl border border-gray-800"
                        />
                      ) : (
                        <img
                          src={post.mediaUrl}
                          className="w-full rounded-xl border border-gray-800"
                        />
                      )}
                    </div>
                  )}

                  <div className="border-t border-gray-800 mt-4 mb-2" />

                  {/* ACTION BAR */}
                  <div className="flex justify-around text-gray-300 text-xs mb-3">
                    {/* LIKE BUTTON */}
                    <button
                      onClick={() => handleLike(post._id)}
                      className="flex items-center gap-1 hover:text-blue-400"
                    >
                      <AiFillLike
                        size={16}
                        className={
                          post.likes?.includes(loggedInUser)
                            ? "text-blue-500"
                            : "text-gray-300"
                        }
                      />
                      {post.likes?.length || 0}
                    </button>

                    {/* COMMENTS BUTTON */}
                    <button
                      onClick={() =>
                        setOpenComments((prev) => ({
                          ...prev,
                          [post._id]: !prev[post._id],
                        }))
                      }
                      className="flex items-center gap-1 hover:text-white"
                    >
                      <FaRegCommentDots size={16} />
                      {post.comments?.length || 0}
                    </button>

                    <button className="flex items-center gap-1 hover:text-white">
                      <IoShareOutline size={16} /> Share
                    </button>
                  </div>

                  {/* COMMENTS SECTION */}
                  {openComments[post._id] && (
                    <div className="bg-black/40 border border-gray-800 rounded-xl p-3">

                      {/* ADD COMMENT */}
                      <div className="flex gap-2 mb-3">
                        <input
                          value={commentText[post._id] || ""}
                          onChange={(e) =>
                            setCommentText((prev) => ({
                              ...prev,
                              [post._id]: e.target.value,
                            }))
                          }
                          className="w-full bg-black border border-gray-700 rounded-lg p-2 text-sm text-white"
                          placeholder="Write a comment..."
                        />
                        <button
                          onClick={() => handleAddComment(post._id)}
                          className="px-3 py-1 bg-blue-600 rounded-lg text-white"
                        >
                          Post
                        </button>
                      </div>

                      {/* SHOW COMMENTS */}
                      {post.comments?.map((c) => (
                        <div key={c._id} className="mb-2">
                          <p className="text-blue-300 text-xs font-semibold">
                            {c.userId?.UserName || "User"}
                          </p>
                          <p className="text-gray-300 text-sm">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProfileView;
