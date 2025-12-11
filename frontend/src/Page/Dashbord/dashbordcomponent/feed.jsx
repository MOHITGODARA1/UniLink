import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [showComments, setShowComments] = useState({}); // store visibility for each post

  const userId = localStorage.getItem("userId");
  const Collage = localStorage.getItem("userCollage");

  // ---------------------------------------------------
  // FETCH POSTS
  // ---------------------------------------------------
  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/Post-fetch?Collage=${Collage}`
      );

      const formatted = res.data.posts.map((post) => ({
        ...post,
        liked: post.likes?.includes(userId),
      }));

      setPosts(formatted);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 3000);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------------------
  // LIKE / UNLIKE POST
  // ---------------------------------------------------
  const toggleLike = async (postId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/toggle-like`, {
        postId,
        userId,
      });

      const updatedLikes = res.data.likesCount;

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, liked: !p.liked, likes: new Array(updatedLikes) }
            : p
        )
      );
    } catch (err) {
      console.log("Like Error:", err);
    }
  };

  // ---------------------------------------------------
  // ADD COMMENT
  // ---------------------------------------------------
  const addComment = async (postId) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/add-comment`, {
        postId,
        userId,
        text,
      });

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, comments: res.data.comments } : p
        )
      );

      setCommentText((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.log("Comment Error:", err);
    }
  };

  // ---------------------------------------------------
  // TOGGLE COMMENTS VISIBILITY
  // ---------------------------------------------------
  const toggleCommentsSection = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId], // toggle
    }));
  };

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 mb-6 shadow-xl"
        >
          {/* HEADER */}
          <div className="flex items-center gap-3">
            <img
              src={post.authorId?.ProfilePic || "/Profile.photo.5.jpg"}
              className="w-12 h-12 rounded-full object-cover border border-gray-700"
            />

            <div>
              <p className="text-white font-semibold">
                {post.authorId?.UserName}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="border-b border-gray-800 my-3"></div>

          {/* TEXT CONTENT */}
          {post.content && (
            <p className="text-gray-300 whitespace-pre-line leading-relaxed mb-4">
              {post.content}
            </p>
          )}

          {/* MEDIA CONTENT */}
          {post.mediaUrl && post.mediaType !== "none" && (
            <div className="border border-gray-700 rounded-xl bg-black mb-4 h-72 flex items-center justify-center overflow-hidden">
              {post.mediaType === "video" ? (
                <video
                  src={post.mediaUrl}
                  controls
                  className="max-h-full max-w-full object-contain rounded-xl"
                />
              ) : (
                <img
                  src={post.mediaUrl}
                  alt="media"
                  className="max-h-full max-w-full object-contain rounded-xl"
                />
              )}
            </div>
          )}

          <div className="border-b border-gray-800 mt-4"></div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-around text-gray-300 mt-4 text-sm">
            <button
              onClick={() => toggleLike(post._id)}
              className="flex items-center gap-2"
            >
              {post.liked ? (
                <AiFillLike className="text-blue-500" />
              ) : (
                <AiOutlineLike />
              )}
              {post.likes?.length || 0} Like
            </button>

            {/* COMMENT BUTTON: toggles visibility */}
            <button
              onClick={() => toggleCommentsSection(post._id)}
              className="flex items-center gap-2"
            >
              <FaRegCommentDots />
              Comment
            </button>

            <button className="flex items-center gap-2">
              <IoShareOutline /> Share
            </button>
          </div>

          {/* COMMENT SECTION - ONLY SHOW WHEN CLICKED */}
          {showComments[post._id] && (
            <div className="mt-4">

              {/* COMMENT INPUT + POST BUTTON */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText[post._id] || ""}
                  onChange={(e) =>
                    setCommentText((prev) => ({
                      ...prev,
                      [post._id]: e.target.value,
                    }))
                  }
                  className="flex-1 p-2 rounded bg-[#1a1a1a] text-white border border-gray-700"
                />

                <button
                  onClick={() => addComment(post._id)}
                  className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
                >
                  Post
                </button>
              </div>

              {/* SHOW ALL COMMENTS */}
              {post.comments?.length > 0 && (
                <div className="mt-4">
                  {post.comments.map((c) => (
                    <div key={c._id} className="flex items-start gap-2 mb-3">
                      <img
                        src={c.userId?.ProfilePic || "/Profile.photo.5.jpg"}
                        className="w-8 h-8 rounded-full"
                      />

                      <div className="bg-[#1f1f1f] p-2 rounded-xl text-gray-300">
                        <p className="font-semibold text-sm">
                          {c.userId?.UserName}
                        </p>
                        <p className="text-sm">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Feed;
