import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState } from "react";

function Profile() {
  // Demo user data — replace with real API later
  const user = {
    name: "Mohit Godara",
    email: "mohit@example.com",
    college: "Lovely Professional University",
    followers: 152,
    following: 89,
    posts: [
      {
        id: 1,
        text: "Just completed a new JavaScript project!",
        time: "2 days ago",
      },
      {
        id: 2,
        text: "Joined the Web Dev Club! Excited to learn more.",
        time: "5 days ago",
      },
      {
        id: 3,
        text: "Hackathon 2025 — What an amazing experience!",
        time: "1 week ago",
      },
    ],
  };

  return (
    <>
      <UpperNavbar />

      <div className="w-full min-h-screen bg-black px-6 py-10 flex justify-center">
        <div className="w-full max-w-4xl">

          {/* PROFILE HEADER */}
          <div className="bg-white/5 border border-gray-800 rounded-2xl p-8 shadow-xl backdrop-blur-lg">
            <div className="flex items-center gap-6">

              {/* Profile Image */}
              <img
                src="/profile.png"
                alt="Profile"
                className="w-28 h-28 rounded-full border border-gray-700 object-cover"
              />

              {/* User Info */}
              <div>
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-purple-300 text-sm mt-1">{user.college}</p>

                {/* FOLLOWERS / FOLLOWING */}
                <div className="flex gap-6 mt-4">
                  <div>
                    <p className="text-white text-lg font-bold">{user.followers}</p>
                    <p className="text-gray-400 text-sm">Followers</p>
                  </div>
                  <div>
                    <p className="text-white text-lg font-bold">{user.following}</p>
                    <p className="text-gray-400 text-sm">Following</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-b border-gray-700 my-8"></div>

          {/* USER POSTS SECTION */}
          <h2 className="text-xl font-semibold text-white mb-4">Your Posts</h2>

          <div className="space-y-4">
            {user.posts.length === 0 ? (
              <p className="text-gray-500">You haven’t posted anything yet.</p>
            ) : (
              user.posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white/5 border border-gray-800 rounded-xl p-5 hover:bg-white/10 transition"
                >
                  <p className="text-white">{post.text}</p>
                  <p className="text-gray-500 text-xs mt-2">{post.time}</p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;
