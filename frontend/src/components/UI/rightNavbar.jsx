function RightNavbar() {
  // Dummy suggested users
  const suggestedUsers = [
    { id: 1, name: "Aarav Sharma", college: "LPU", avatar: "/Profile.photo.5.jpg" },
    { id: 2, name: "Neha Patel", college: "Delhi University", avatar: "/Profile.photo.5.jpg" },
    { id: 3, name: "Rohan Mehta", college: "BITS Pilani", avatar: "/Profile.photo.5.jpg" },
  ];

  // Dummy suggested groups
  // const suggestedGroups = [
  //   { id: 1, name: "Web Dev Community", members: "4.2k members" },
  //   { id: 2, name: "JavaScript Hub", members: "8.1k members" },
  //   { id: 3, name: "UI/UX Community", members: "3.7k members" },
  // ];

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

      {/* --------------- SUGGESTED USERS --------------- */}
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Suggested Users
      </h2>

      <div className="space-y-4 mb-8">
        {suggestedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-gray-700 hover:bg-white/10 transition"
          >
            <img
              src={user.avatar}
              className="w-10 h-10 rounded-full object-cover border border-gray-600"
              alt=""
            />
            <div className="flex-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.college}</p>
            </div>
            <button
              className="px-3 py-1 text-xs rounded-lg bg-blue-600 hover:bg-blue-500 transition"
            >
              Follow
            </button>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-b border-gray-700 mb-6"></div>

      {/* --------------- SUGGESTED GROUPS --------------- */}
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Suggested Groups
      </h2>

      <p className="text-gray-400 text-xs mb-3 italic">
        Groups feature coming soon...
      </p>

      {/* <div className="space-y-4">
        {suggestedGroups.map((group) => (
          <div
            key={group.id}
            className="p-4 rounded-xl bg-white/5 border border-gray-700 hover:bg-white/10 transition"
          >
            <p className="text-sm font-medium">{group.name}</p>
            <p className="text-xs text-gray-400 mb-2">{group.members}</p>

            <button
              disabled
              className="
                px-3 py-1 text-xs rounded-lg 
                bg-gray-700 text-gray-400 
                cursor-not-allowed
              "
            >
              Join
            </button>
          </div>
        ))}
      </div> */}

    </div>
  );
}

export default RightNavbar;
