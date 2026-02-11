import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RightNavbar() {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("Token");

  // FETCH SUGGESTIONS
  const fetchSuggestions = async () => {
    try {
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
        w-83
        bg-white
        border border-gray-200
        rounded-xl
        p-6
        text-black
        fixed
        right-6
        top-24
        max-h-[calc(100vh-120px)]
        overflow-y-auto
      "
    >
      {/* HEADER */}
      <h2 className="text-sm font-semibold mb-4 text-gray-900">
        Suggested for you
      </h2>

      <div className="space-y-3">
        {suggestedUsers.length === 0 ? (
          <p className="text-sm text-gray-500">
            No suggestions right now.
          </p>
        ) : (
          suggestedUsers.map((user) => (
            <Link
              key={user._id}
              to={`/profile/${user._id}`}
              className="block"
            >
              <div
                className="
                  flex items-center gap-3
                  p-3
                  rounded-lg
                  bg-gray-50
                  border border-gray-200
                  hover:bg-white
                  hover:shadow-sm
                  transition
                "
              >
                {/* Avatar */}
                <img
                  src={user.ProfilePic || "/Profile.photo.5.jpg"}
                  alt="User"
                  className="
                    w-10 h-10
                    rounded-full
                    object-cover
                    border border-gray-300
                  "
                />

                {/* USER INFO */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.UserName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.Collage}
                  </p>
                </div>

                {/* FOLLOW BUTTON */}
                <button
                  className={`
                    px-3 py-1
                    text-xs
                    rounded-full
                    font-medium
                    transition
                    shrink-0
                    ml-auto
                    ${
                      user.isFollowing
                        ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }
                  `}
                  onClick={(e) => {
                    e.preventDefault();
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