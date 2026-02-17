import { useEffect, useState } from "react";
import axios from "axios";

const storedUser = JSON.parse(localStorage.getItem("Userdata"));
const userId = storedUser?._id;
function UniLinkSidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const loadUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/dashboard?userId=${userId}`);

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
      <div className="hidden lg:block w-80 bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-lg">
        <div className="animate-pulse space-y-4">
          {/* Loading Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mt-4"></div>
            <div className="h-3 bg-gray-200 rounded w-40 mt-2"></div>
          </div>
          {/* Loading Bio */}
          <div className="space-y-2 pt-4">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
          {/* Loading Skills */}
          <div className="space-y-2 pt-4">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
            <div className="flex gap-2 flex-wrap">
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const visibleSkills = user.Skill?.slice(0, 8) || [];
  const hasMoreSkills = user.Skill && user.Skill.length > 8;

  return (
    <div
      className="
        hidden lg:block
        w-80
        bg-white/80
        backdrop-blur-lg
        border border-gray-200/50
        rounded-2xl
        shadow-lg
        overflow-hidden
        hover:shadow-xl
        transition-shadow duration-300
      "
    >
      {/* TOP GRADIENT HEADER */}
      <div className="h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-2 right-2 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
      </div>

      {/* PROFILE SECTION */}
      <div className="relative px-6 pb-6 text-center">
        {/* AVATAR with ring */}
        <div className="relative inline-block -mt-12">
          <img
            src={user.ProfilePic || "/Profile.photo.5.jpg"}
            alt={user.UserName}
            className="
              w-24 h-24
              rounded-full
              object-cover
              border-4 border-white
              shadow-lg
              bg-white
            "
          />
          {/* Online indicator */}
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        {/* User Info */}
        <h2 className="mt-4 text-lg font-bold text-gray-900">
          {user.UserName}
        </h2>

        <p className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {user.Email}
        </p>

        <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {user.Collage}
        </p>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200"></div>

      {/* BIO SECTION */}
      <div className="px-6 py-5 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">About</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {user.Bio || "No bio added yet. Share something about yourself!"}
            </p>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200"></div>

      {/* SKILLS SECTION */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-sm font-bold text-gray-900">
            Skills & Expertise
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleSkills.length ? (
            visibleSkills.map((skill, i) => (
              <span
                key={i}
                className="
                  px-3 py-1.5
                  text-xs font-medium
                  rounded-full
                  border-2 border-gray-200
                  bg-white
                  text-gray-700
                  hover:border-blue-300
                  hover:bg-blue-50
                  hover:text-blue-700
                  transition-all duration-200
                  shadow-sm
                "
              >
                {skill}
              </span>
            ))
          ) : (
            <div className="w-full text-center py-4">
              <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-sm text-gray-500">
                No skills added yet
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Add your skills to showcase your expertise
              </p>
            </div>
          )}

          {hasMoreSkills && (
            <span
              className="
                px-3 py-1.5
                text-xs font-semibold
                rounded-full
                border-2 border-blue-500
                bg-gradient-to-r from-blue-50 to-indigo-50
                text-blue-700
                cursor-pointer
                hover:from-blue-100 hover:to-indigo-100
                hover:border-blue-600
                hover:shadow-md
                transition-all duration-200
                shadow-sm
              "
            >
              +{user.Skill.length - 8} more
            </span>
          )}
        </div>
      </div>

      {/* FOOTER STATS (Optional Enhancement)
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {user.Skill?.length || 0}
            </div>
            <div className="text-xs text-gray-500">Skills</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">—</div>
            <div className="text-xs text-gray-500">Posts</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">—</div>
            <div className="text-xs text-gray-500">Events</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default UniLinkSidebar;