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
      <div className="hidden md:block w-64 bg-white border border-gray-200 rounded-xl p-6 text-gray-500 text-sm">
        Loading...
      </div>
    );
  }

  const visibleSkills = user.Skill?.slice(0, 8) || [];
  const hasMoreSkills = user.Skill && user.Skill.length > 8;

  return (
    <div
      className="
        hidden md:block
        w-72
        bg-white
        border border-gray-200
        rounded-xl
        text-black
        overflow-hidden
      "
    >
      {/* TOP BLUE STRIP (50%) */}
      <div className="h-20 bg-blue-600"></div>

      {/* PROFILE */}
      <div className="relative px-6 pb-6 text-center">
        {/* AVATAR */}
        <img
          src={user.ProfilePic || "/Profile.photo.5.jpg"}
          alt="Profile"
          className="
            w-20 h-20
            rounded-full
            object-cover
            border-4 border-white
            mx-auto
            -mt-10
            bg-white
          "
        />

        <h2 className="mt-3 text-base font-semibold">
          {user.UserName}
        </h2>

        <p className="text-sm text-gray-600">
          {user.Email}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {user.Collage}
        </p>
      </div>

      {/* LINE */}
      <div className="border-t border-gray-200"></div>

      {/* BIO SECTION */}
      <div className="px-6 py-4 bg-gray-50 text-center">
        <p className="text-sm text-gray-700 leading-relaxed">
          {user.Bio || "No bio added."}
        </p>
      </div>

      {/* LINE */}
      <div className="border-t border-gray-200"></div>

      {/* SKILLS */}
      <div className="p-6">
        <h3 className="text-sm font-semibold mb-3">
          Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {visibleSkills.length ? (
            visibleSkills.map((skill, i) => (
              <span
                key={i}
                className="
                  px-3 py-1
                  text-xs
                  rounded-full
                  border border-gray-300
                  bg-white
                  text-gray-800
                "
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No skills added.
            </p>
          )}

          {hasMoreSkills && (
            <span
              className="
                px-3 py-1
                text-xs
                rounded-full
                border border-blue-500
                bg-blue-50
                text-blue-700
                cursor-pointer
                hover:bg-blue-100
                transition
              "
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