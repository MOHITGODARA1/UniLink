import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const Collage = localStorage.getItem("userCollage");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/Post-fetch?Collage=${Collage}`
      );
      setPosts(res.data.posts);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p._id === id
          ? { ...p, liked: !p.liked, likes: (p.likes || 0) + (p.liked ? -1 : 1) }
          : p
      )
    );
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

          {/* MEDIA CONTENT (IMAGE OR VIDEO) */}
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

          {/* ACTIONS */}
          <div className="flex justify-around text-gray-300 mt-4 text-sm">
            <button onClick={() => toggleLike(post._id)} className="flex items-center gap-2">
              {post.liked ? <AiFillLike className="text-blue-500" /> : <AiOutlineLike />}
              {post.likes || 0} Like
            </button>

            <button className="flex items-center gap-2">
              <FaRegCommentDots /> Comment
            </button>

            <button className="flex items-center gap-2">
              <IoShareOutline /> Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
