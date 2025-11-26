import demoPosts from "./Demopost";

function Feed() {
  return (
    <div className="flex flex-col mt-5">

      {demoPosts.map((post, index) => (
        <div 
          key={index}
          className="w-full max-w-2xl bg-black border border-gray-800 rounded-xl p-4 text-white mb-6"
        >
          
          {/* TOP: PROFILE + NAME */}
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

          {/* ACTION BUTTONS */}
          <div className="flex justify-between mt-4 border-t border-gray-800 pt-3 text-gray-300 text-sm">
            <button className="hover:text-white transition">Like</button>
            <button className="hover:text-white transition">Comment</button>
            <button className="hover:text-white transition">Share</button>
          </div>

        </div>
      ))}

    </div>
  );
}

export default Feed;
