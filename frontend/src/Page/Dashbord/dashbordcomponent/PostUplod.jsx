function Postuplode() {
  return (
    <div
      className="
        w-[90%] max-w-2xl 
        bg-black 
        border border-gray-800 
        rounded-2xl 
        p-5 
        text-white 
        shadow-xl
      "
    >
      {/* TOP: Avatar + Input */}
      <div className="flex items-center gap-4">
        {/* PROFILE IMAGE */}
        <img
          src="/profile.png"
          alt="profile"
          className="w-12 h-12 rounded-full border border-gray-700 object-cover"
        />

        {/* INPUT BOX */}
        <textarea
          placeholder="Start a post..."
          className="
            w-full 
            bg-black 
            border border-gray-700 
            rounded-xl 
            p-4 
            text-gray-300 
            placeholder-gray-500 
            resize-none 
            focus:border-blue-500 
            focus:outline-none 
            transition
          "
          rows="3"
        ></textarea>
      </div>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gray-800 my-5"></div>

      {/* BOTTOM ACTIONS */}
      <div className="flex justify-between px-2">

        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          <i className="ri-video-line text-green-400 text-xl"></i>
          <span className="text-sm">Video</span>
        </button>

        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          <i className="ri-image-2-line text-blue-400 text-xl"></i>
          <span className="text-sm">Photo</span>
        </button>

        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          <i className="ri-article-line text-orange-400 text-xl"></i>
          <span className="text-sm">Write article</span>
        </button>

      </div>
    </div>
  );
}

export default Postuplode;
