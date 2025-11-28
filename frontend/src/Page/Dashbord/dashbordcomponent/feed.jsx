import demoPosts from "./Demopost";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function Feed() {
  return (
    <div className="flex flex-col mt-5">

      {demoPosts.map((post, index) => (
        <div
          key={index}
          className="w-full max-w-2xl bg-black border border-gray-800 rounded-xl p-4 text-white mb-6"
        >
          {/* PROFILE TOP */}
          <div className="flex items-start gap-3">
            <img
              src={post.profile}
              alt="profile"
              className="w-10 h-10 rounded-full border border-gray-700"
            />

            <div>
              <h3 className="text-sm font-semibold">{post.name}</h3>
              <p className="text-gray-400 text-xs">{post.time}</p>
            </div>
          </div>

          {/* TEXT */}
          <p className="mt-3 text-sm text-gray-200 leading-relaxed">
            {post.text}
          </p>

          {/* IMAGE */}
          {post.image && (
            <div className="mt-3">
              <img
                src={post.image}
                className="w-full rounded-lg border border-gray-700"
                alt="post-image"
              />
            </div>
          )}

          {/* ACTION BUTTONS WITH ICONS */}
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
      ))}

    </div>
  );
}

export default Feed;
