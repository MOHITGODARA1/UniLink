import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";
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

      setPosts(res.data.posts); // latest posts
    } catch (err) {
      console.log("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();              // load first time

    const interval = setInterval(() => {
      fetchPosts();            // 🔥 auto-refetch every 3 sec
    }, 3000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="flex flex-col mt-5">

      {posts.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No posts yet...</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="w-full max-w-2xl bg-black border border-gray-800 rounded-xl p-4 text-white mb-6"
          >
            {/* PROFILE TOP */}
            <div className="flex items-start gap-3">
              <img
                src="/profile.png"
                alt="profile"
                className="w-10 h-10 rounded-full border border-gray-700"
              />

              <div>
                <h3 className="text-sm font-semibold">
                  {post.authorId?.UserName}
                </h3>
                <p className="text-gray-400 text-xs">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* TEXT */}
            <p className="mt-3 text-sm text-gray-200 leading-relaxed">
              {post.content}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex justify-between mt-4 border-t border-gray-800 pt-3 text-gray-300 text-sm">
              <button className="flex items-center gap-2 hover:text-white transition">
                <AiFillLike size={18} /> Like
              </button>
              <button className="flex items-center gap-2 hover:text-white transition">
                <FaRegCommentDots size={18} /> Comment
              </button>
              <button className="flex items-center gap-2 hover:text-white transition">
                <IoShareOutline size={18} /> Share
              </button>
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default Feed;
