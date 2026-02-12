import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RightNavbar() {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("Token");

  // FETCH SUGGESTIONS
  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API}/Suggestion-User/${userId}`
      );

      const updated = res.data.map((u) => ({
        ...u,
        isFollowing: u.Followers?.includes(userId) || false,
      }));

      setSuggestedUsers(updated);
    } catch (error) {
      console.log("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchSuggestions();
  }, [userId]);

  // FOLLOW / UNFOLLOW
  const handleFollow = async (targetUserId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/follow-unfollow`,
        { followId: targetUserId },
        { headers: { authorization: token } }
      );

      const followed = res.data.followed;

      setSuggestedUsers((prev) =>
        prev.map((user) =>
          user._id === targetUserId
            ? { ...user, isFollowing: followed }
            : user
        )
      );
    } catch (error) {
      console.log("Follow Error:", error);
    }
  };

  return (
    <div
      className="
        hidden lg:block
        w-89
        bg-white/80
        backdrop-blur-lg
        border border-gray-200/50
        rounded-2xl
        shadow-lg
        p-6
        fixed
        right-6
        top-24
        max-h-[calc(100vh-120px)]
        overflow-y-auto
        hover:shadow-xl
        transition-shadow duration-300
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 className="text-base font-bold text-gray-900">
          Suggested for you
        </h2>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-24"></div>
                <div className="h-2 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-7 bg-gray-200 rounded-full w-16"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {suggestedUsers.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-sm font-medium text-gray-500 mb-1">
                No suggestions yet
              </p>
              <p className="text-xs text-gray-400">
                Check back later for new connections
              </p>
            </div>
          ) : (
            suggestedUsers.map((user) => (
              <Link
                key={user._id}
                to={`/profile/${user._id}`}
                className="block group"
              >
                <div
                  className="
                    flex items-center gap-3
                    p-3
                    rounded-xl
                    bg-gradient-to-br from-gray-50 to-white
                    border-2 border-gray-200
                    hover:border-gray-300
                    hover:shadow-md
                    transition-all duration-200
                    group-hover:scale-[1.02]
                  "
                >
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={user.ProfilePic || "/Profile.photo.5.jpg"}
                      alt={user.UserName}
                      className="
                        w-12 h-12
                        rounded-full
                        object-cover
                        border-2 border-white
                        shadow-md
                      "
                    />
                    {/* Optional: Online indicator */}
                    {/* <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div> */}
                  </div>

                  {/* USER INFO */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {user.UserName}
                    </p>
                    <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="truncate">{user.Collage}</span>
                    </p>
                  </div>

                  {/* FOLLOW BUTTON */}
                  <button
                    className={`
                      px-4 py-1.5
                      text-xs font-semibold
                      rounded-full
                      transition-all duration-200
                      shrink-0
                      ml-auto
                      shadow-sm
                      ${
                        user.isFollowing
                          ? "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-md border-2 border-transparent"
                      }
                    `}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFollow(user._id);
                    }}
                  >
                    {user.isFollowing ? (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Following
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Follow
                      </span>
                    )}
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {/* FOOTER - See All Link */}
      {suggestedUsers.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link
            to="/discover"
            className="
              flex items-center justify-center gap-2
              text-sm font-medium text-blue-600
              hover:text-blue-700
              transition-colors
              py-2
              rounded-lg
              hover:bg-blue-50
            "
          >
            <span>Discover more people</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}

      {/* Custom scrollbar styling */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}

export default RightNavbar;