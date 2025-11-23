function Feature() {
  return (
    <>
      <div className="h-auto bg-black w-full overflow-hidden py-10">

        {/* Heading + Subheading */}
        <div className="flex flex-col justify-center items-center mt-6 px-4">
          <h1 className="text-4xl font-semibold bg-linear-to-b from-white to-gray-400 text-transparent bg-clip-text text-center">
            Powerful Feature
          </h1>

          <p className="text-gray-400 text-center mt-2">
            Everything you need to succeed together
          </p>
        </div>

        {/* Cards Section */}
        <div className="w-full mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white/5 border border-gray-700 p-8 h-50 rounded-2xl backdrop-blur-md 
                          hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition">
            <div className="flex justify-start">
              <i className="ri-team-line text-4xl text-white"></i>
            </div>
            <h2 className="text-white text-xl font-semibold mt-5">Team Collaboration</h2>
            <p className="text-gray-400 mt-2 ">
              Connect with teammates, share tasks, and work smarter together.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 border border-gray-700 p-8 h-50 rounded-2xl backdrop-blur-md 
                          hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition">
            <div className="flex justify-start">
              <i className="ri-graduation-cap-line text-5xl text-white"></i>
            </div>
            <h2 className="text-white text-xl font-semibold mt-5 ">Student Profiles</h2>
            <p className="text-gray-400 mt-2">
              Explore verified student profiles and build meaningful connections.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 border border-gray-700 p-8 h-50 rounded-2xl backdrop-blur-md 
                          hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition">
            <div className="flex justify-start">
              <i className="ri-lightbulb-flash-line text-5xl text-white"></i>
            </div>
            <h2 className="text-white text-xl font-semibold mt-5 ">Idea Sharing</h2>
            <p className="text-gray-400 mt-2 ">
              Share project ideas and find partners with matching skills.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white/5 border border-gray-700 p-8 h-50 rounded-2xl backdrop-blur-md 
                          hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition">
            <div className="flex justify-start">
              <i className="ri-group-line text-5xl text-white"></i>
            </div>
            <h2 className="text-white text-xl font-semibold mt-5 ">Community Groups</h2>
            <p className="text-gray-400 mt-2 ">
              Join different university communities and collaborate on projects.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white/5 border border-gray-700 p-8 h-50 rounded-2xl backdrop-blur-md 
                          hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition">
            <div className="flex justify-start">
              <i className="ri-chat-voice-line text-5xl text-white"></i>
            </div>
            <h2 className="text-white text-xl font-semibold mt-5 ">Smart Communication</h2>
            <p className="text-gray-400 mt-2">
              Stay connected with real-time chats and voice-enabled messaging.
            </p>
          </div>

        </div>
      </div>
      <div className="h-px bg-gray-700"></div>
    </>
  );
}

export default Feature;
