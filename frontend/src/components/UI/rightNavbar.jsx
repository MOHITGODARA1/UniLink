import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RightNavbar() {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("Token");

  // ---------------- FETCH SUGGESTIONS ----------------
  const fetchSuggestions = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/Suggestion-User/${userId}`
      );

      // Each user should have "isFollowing" based on logged-in user's following list
      const updated = res.data.map((u) => ({
        ...u,
        isFollowing: u.Followers?.includes(userId) || false,
      }));

      setSuggestedUsers(updated);
    } catch (error) {
      console.log("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchSuggestions();
  }, [userId]);

  // ---------------- FOLLOW / UNFOLLOW ----------------
  const handleFollow = async (targetUserId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/follow-unfollow`,
        { followId: targetUserId },
        { headers: { authorization: token } }
      );

      const followed = res.data.followed; // true = following, false = unfollowed

      // Update UI instantly
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
        w-72 
        bg-[#0d0d0d]
        border border-gray-800 
        rounded-2xl 
        shadow-xl 
        p-6  
        text-white
        fixed right-6 top-24
      "
    >
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Suggested Users
      </h2>

      <div className="space-y-4 mb-8">
        {suggestedUsers.length === 0 ? (
          <p className="text-gray-500 text-sm">No suggestions right now.</p>
        ) : (
          suggestedUsers.map((user) => (
            <Link key={user._id} to={`/profile/${user._id}`} className="block">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-gray-700 hover:bg-white/10 transition">

                {/* Avatar */}
                <img
                  src={user.ProfilePic || "/Profile.photo.5.jpg"}
                  className="w-10 h-10 rounded-full object-cover border border-gray-600"
                  alt="User"
                />

                {/* Username + College */}
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold truncate">{user.UserName}</p>
                  <p className="text-xs text-gray-400 truncate">{user.Collage}</p>
                </div>

                {/* Follow / Following Button */}
                <button
                  className={`px-3 py-1 text-xs rounded-lg transition shrink-0 ml-auto
                    ${
                      user.isFollowing
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-blue-600 hover:bg-blue-500"
                    }
                  `}
                  onClick={(e) => {
                    e.preventDefault(); // stop navigation
                    handleFollow(user._id);
                  }}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default RightNavbar;
