import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState } from "react";

function GroupTeam() {
  const [showModal, setShowModal] = useState(false);

  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Design & UI Club",
      desc: "For creative designers, UI/UX lovers & figma artists.",
      members: 30,
      vacancy: "Hiring 1 Motion Designer",
      icon: "ri-brush-line",
    },
    {
      id: 2,
      name: "Game Dev Team",
      desc: "Unity, Unreal, 2D & 3D Game Projects.",
      members: 14,
      vacancy: "Open for Game Designer",
      icon: "ri-gamepad-fill",
    },
    {
      id: 3,
      name: "Entrepreneurship Cell",
      desc: "For startup builders, founders & innovators.",
      members: 50,
      vacancy: "Seeking 2 Marketing Leads",
      icon: "ri-lightbulb-flash-line",
    },
  ]);

  return (
    <>
      <UpperNavbar />

      <div className="w-full min-h-screen bg-black px-6 py-10">
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white">Groups & Teams</h1>
              <p className="text-gray-400">Discover, join, or create student teams and clubs.</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 px-5 py-2 rounded-xl text-white font-semibold hover:bg-blue-500 transition"
            >
              + Create Group
            </button>
          </div>

          {/* TEAM GRID */}
          <div className="grid md:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white/5 backdrop-blur-xl p-6 border border-gray-800 rounded-2xl shadow-lg hover:bg-white/10 transition flex flex-col"
              >
                
                {/* ICON */}
                <div className="w-14 h-14 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center mb-4">
                  <i className={`${team.icon} text-2xl text-blue-400`}></i>
                </div>

                {/* TEAM DETAILS */}
                <h3 className="text-white text-lg font-semibold">{team.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{team.desc}</p>

                <p className="text-blue-400 text-sm font-medium mt-3">
                  📌 {team.vacancy}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  👥 {team.members} Members
                </p>

                {/* JOIN BUTTON */}
                <button className="mt-4 w-full py-2 rounded-xl bg-green-600 hover:bg-green-500 transition font-medium">
                  Join Team
                </button>
              </div>
            ))}
          </div>

          {/* CREATE TEAM MODAL */}
          {showModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">
              <div className="bg-[#1b1b1b] border border-gray-700 p-6 rounded-2xl w-full max-w-lg shadow-xl">

                <h2 className="text-xl font-semibold text-white mb-4">Create a Team / Club</h2>

                <input
                  type="text"
                  placeholder="Enter Team Name"
                  className="w-full bg-black/40 border border-gray-700 px-4 py-3 rounded-xl text-white placeholder-gray-400 mb-4"
                />

                <textarea
                  rows="3"
                  placeholder="Description..."
                  className="w-full bg-black/40 border border-gray-700 px-4 py-3 rounded-xl text-white placeholder-gray-400 mb-4"
                ></textarea>

                <input
                  type="text"
                  placeholder="Vacancy (e.g., Need 2 Writers)"
                  className="w-full bg-black/40 border border-gray-700 px-4 py-3 rounded-xl text-white placeholder-gray-400 mb-4"
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>

                  <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition">
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default GroupTeam;
