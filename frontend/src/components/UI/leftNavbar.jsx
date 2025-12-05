import { useEffect, useState } from "react";
import axios from "axios";

function UniLinkSidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const loadUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/dashboard`,
          { headers: { authorization: token } }
        );

        const u = res.data.user;

        localStorage.setItem("userId", u._id);
        localStorage.setItem("userCollage", u.Collage);

        setUser(u);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    loadUser();
  }, []);

  if (!user) {
    return (
      <div className="text-gray-300 p-4 bg-[#0d0d0d] rounded-xl border border-gray-800">
        Loading...
      </div>
    );
  }

  // Show only the first 8 skills
  const visibleSkills = user.Skill?.slice(0, 8) || [];
  const hasMoreSkills = user.Skill && user.Skill.length > 8;

  return (
    <div
      className="
        w-64 
        bg-[#0d0d0d] 
        border border-gray-800 
        rounded-2xl 
        shadow-xl 
        p-6 
        text-white
      "
    >

      {/* PROFILE PHOTO */}
      <div className="flex flex-col items-center">
        <img
          src={user.ProfilePic ? user.ProfilePic : "/Profile.photo.5.jpg"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-md"
        />

        <h2 className="text-lg font-semibold mt-3">{user.UserName}</h2>
        <p className="text-gray-400 text-sm">{user.Email}</p>
        <p className="text-blue-400 text-xs mt-1">{user.Collage}</p>

        {/* USER BIO */}
        <p className="text-gray-400 text-xs mt-3 text-center">
          {user.Bio ? user.Bio : "No bio added."}
        </p>
      </div>

      <div className="border-b border-gray-800 my-4"></div>

      {/* SKILLS SECTION */}
      <div>
        <h3 className="text-gray-300 text-xs font-semibold mb-2">
          Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {visibleSkills.length ? (
            visibleSkills.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full border border-gray-700 bg-white/5 text-blue-300"
              >
                {s}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-xs">No skills added.</p>
          )}

          {/* + MORE BUTTON IF SKILLS > 8 */}
          {hasMoreSkills && (
            <span
              className="px-3 py-1 text-xs rounded-full border border-gray-700 bg-white/5 text-gray-300 cursor-pointer"
            >
              +{user.Skill.length - 8} more
            </span>
          )}
        </div>
      </div>

    </div>
  );
}

export default UniLinkSidebar;
