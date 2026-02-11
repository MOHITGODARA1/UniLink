import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [showComments, setShowComments] = useState({});

  const userId = localStorage.getItem("userId");
  const Collage = localStorage.getItem("userCollage");

  // FETCH POSTS
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
  }, []);

  // LIKE / UNLIKE
  const toggleLike = async (postId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/toggle-like`, {
        postId,
        userId,
      });

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, liked: !p.liked, likes: res.data.likes }
            : p
        )
      );
    } catch (err) {
      console.log("Like Error:", err);
    }
  };

  // ADD COMMENT
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

  // TOGGLE COMMENTS
  const toggleCommentsSection = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="bg-white">
      {posts.map((post) => (
        <div key={post._id}>

          {/* POST CONTAINER */}
          <div
            className="
              w-full
              bg-white
              px-4 py-4
              md:p-5
              md:mb-6
              md:border md:border-gray-200
              md:rounded-xl
              md:shadow-sm
            "
          >
            {/* HEADER */}
            <div className="flex items-center gap-3">
              <img
                src={post.authorId?.ProfilePic || "/Profile.photo.5.jpg"}
                alt="User"
                className="w-10 h-10 rounded-full border border-gray-300 object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {post.authorId?.UserName}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* LINE BETWEEN PROFILE & CONTENT */}
            <div className="border-b border-gray-200 my-3" />

            {/* TEXT CONTENT */}
            {post.content && (
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            )}

            {/* MEDIA */}
            {post.mediaUrl && post.mediaType !== "none" && (
              <div className="mt-3 border border-gray-200 overflow-hidden bg-gray-50 md:rounded-md">
                {post.mediaType === "video" ? (
                  <video
                    src={post.mediaUrl}
                    controls
                    className="w-full max-h-[420px] object-contain"
                  />
                ) : (
                  <img
                    src={post.mediaUrl}
                    alt="media"
                    className="w-full max-h-[420px] object-contain"
                  />
                )}
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex justify-around mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
              <button
                onClick={() => toggleLike(post._id)}
                className={`flex items-center gap-2 ${
                  post.liked ? "text-blue-600" : ""
                }`}
              >
                {post.liked ? <AiFillLike /> : <AiOutlineLike />}
                {post.likes?.length || 0}
              </button>

              <button
                onClick={() => toggleCommentsSection(post._id)}
                className="flex items-center gap-2"
              >
                <FaRegCommentDots />
                Comment
              </button>

              <button className="flex items-center gap-2">
                <IoShareOutline />
                Share
              </button>
            </div>

            {/* COMMENTS */}
            {showComments[post._id] && (
              <div className="mt-3 space-y-3">
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
                    className="flex-1 p-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => addComment(post._id)}
                    className="bg-blue-600 text-white px-4 rounded-lg text-sm"
                  >
                    Post
                  </button>
                </div>

                {post.comments?.map((c) => (
                  <div key={c._id} className="flex gap-2">
                    <img
                      src={c.userId?.ProfilePic || "/Profile.photo.5.jpg"}
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                      <p className="text-xs font-semibold text-gray-900">
                        {c.userId?.UserName}
                      </p>
                      <p className="text-sm text-gray-700">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MOBILE POST DIVIDER (CONTINUOUS FEED) */}
          <div className="md:hidden border-b border-gray-200" />
        </div>
      ))}
    </div>
  );
}

export default Feed;