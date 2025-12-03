import { useState, useEffect } from "react";
import axios from "axios";

function UniLinkSidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const loadUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/dashboard`,
          {
            headers: { authorization: token }
          }
        );
        const userData = res.data.user;
        localStorage.setItem("userId", userData._id);
        localStorage.setItem("userCollage", userData.Collage);
        setUser(res.data.user);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    loadUser();
  }, []);

  if (!user) {
    return (
      <div className="text-white p-6">
        <p>Loading user...</p>
      </div>
    );
  }

  return (
    <div
      className="
        fixed top-20 ml-5
        w-67
        bg-black/40 backdrop-blur-xl
        border border-gray-800
        rounded-2xl shadow-2xl
        text-white p-6
      "
    >
      {/* USER PROFILE */}
      <div className="flex flex-col items-center">
        <img
          src="/profile.png"
          alt="profile"
          className="w-20 h-20 rounded-full border border-gray-700 shadow-md"
        />

        <h2 className="text-xl font-semibold mt-3">{user.UserName}</h2>

        <p className="text-gray-400 text-sm">{user.Email}</p>

        <p className="text-blue-400 text-sm font-medium mt-1">
          {user.Collage}
        </p>
      </div>

      {/* Divider */}
      <div className="mt-4 mb-5 border-b border-gray-800"></div>

      {/* PREMIUM BOX */}
      {/* <div className="bg-white/5 border border-gray-700 rounded-xl p-4 hover:bg-white/10 transition">
        <p className="text-sm font-semibold text-gray-200">
          Upgrade to Premium
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Get unlimited storage & exclusive resources.
        </p>

        <button
          className="
            mt-3 w-full py-2 rounded-xl 
            bg-blue-600 font-medium
            hover:bg-blue-500 transition
          "
        >
          Upgrade Now
        </button>
      </div> */}

      {/* SKILLS */}
      <div className="mt-6">
        <h3 className="text-gray-300 text-sm font-semibold mb-3">Skills</h3>

        <div className="flex flex-wrap gap-2">
          {user.Skill && user.Skill.length > 0 ? (
            user.Skill.map((skill, index) => (
              <span
                key={index}
                className="
                  px-3 py-1 text-xs 
                  rounded-full
                  border border-gray-700
                  text-blue-300
                "
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-xs">No skills added</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UniLinkSidebar;
