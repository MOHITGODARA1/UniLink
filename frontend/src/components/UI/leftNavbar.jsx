function UniLinkSidebar() {
  return (
    <div
      className="
        fixed 
        top-20 ml-5
        w-72 
        h-[85vh]
        bg-[#0f0f0f] 
        border border-gray-800 
        rounded-2xl 
        shadow-xl 
        text-white 
        p-6
        overflow-y-auto
      "
    >
      {/* TOP USER SECTION */}
      <div className="text-center">
        <img
          src="/profile.png"
          alt="profile"
          className="w-20 h-20 rounded-full border border-gray-700 mx-auto"
        />

        <h2 className="text-xl font-bold mt-3">Mohit Godara</h2>
        <p className="text-gray-300 text-sm">Full Stack Developer</p>
        <p className="text-gray-400 text-xs mt-1">Rajasthan, India</p>

        <p className="mt-1 text-blue-400 font-medium text-sm">
          Lovely Professional University
        </p>
      </div>

      {/* PREMIUM BOX */}
      <div className="mt-6 bg-black/40 border border-gray-700 p-4 rounded-xl">
        <p className="text-gray-200 text-sm font-semibold">Upgrade to Premium</p>
        <button className="
          mt-3 w-full py-2 rounded-xl 
          bg-white text-black font-medium
          hover:bg-blue-500 hover:text-white transition
        ">
          Upgrade Now
        </button>
      </div>

      {/* SKILLS */}
      <div className="mt-6">
        <h3 className="text-gray-200 font-semibold mb-2">Skills</h3>

        <div className="flex flex-wrap gap-2">
          {["JavaScript", "React.js", "Node.js", "MongoDB", "Tailwind"].map(
            (skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-black/40 border border-gray-700 rounded-full text-xs text-blue-300"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default UniLinkSidebar;
