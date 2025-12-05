import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // ⭐ NEW STATE → OPEN SKILL MODAL
  const [openSkillModal, setOpenSkillModal] = useState(false);

  // ⭐ NEW STATE → FOR SKILL SELECT MODAL
  const [inputSkill, setInputSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const token = localStorage.getItem("Token");

  const allSkills = [
    "JavaScript","React.js","Node.js","Express.js","MongoDB","HTML","CSS","Tailwind CSS",
    "Redux","Next.js","TypeScript","Git","GitHub","Java","Spring Boot","Python",
    "Django","Flask","C","C++","SQL","MySQL","PostgreSQL","PHP","Laravel","DevOps",
    "Docker","Kubernetes","Linux","Cloud Computing","AWS","Firebase","DSA",
    "Machine Learning","Deep Learning","AI","Cyber Security","Blockchain",
    "Data Engineering","TensorFlow","OpenCV"
  ];

  // ============================ FETCH USER POSTS ============================
  const fetchUserPosts = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/fetch-user-posts?userId=${id}`
      );
      setPosts(res.data.posts);
    } catch (err) {
      console.log("Error loading posts", err);
    }
  };

  // ============================ FETCH USER DATA ============================
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/dashboard`, {
          headers: { authorization: token },
        });

        const u = res.data.user;

        setUser(u);
        setIsFollowing(false);
        setSelectedSkills(u.Skill || []);  // ⭐ PRE-SELECT SKILLS

        fetchUserPosts(u._id);
      } catch (err) {
        console.log("Error loading user", err);
      }
    };

    loadUser();
  }, []);

  // FOLLOW BUTTON
  const handleFollow = () => setIsFollowing((prev) => !prev);

  // MESSAGE BUTTON
  const handleMessage = () => alert("Messaging feature coming soon!");

  // =====================================================================================
  // ⭐ SKILL MODAL FUNCTIONS (No UI changes — your original SkillSelect UI is reused)
  // =====================================================================================

  const addTypedSkill = () => {
    if (!inputSkill.trim()) return;
    if (!selectedSkills.includes(inputSkill.trim())) {
      setSelectedSkills([...selectedSkills, inputSkill.trim()]);
    }
    setInputSkill("");
  };

  const addSuggestedSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const updateSkillAPI = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/Skill-Set`,
        {
          UserName: user.UserName,
          Skill: selectedSkills,
        }
      );

      alert("Skills Updated Successfully!");
      setOpenSkillModal(false);
    } catch (err) {
      alert("Failed to update skills",err);
    }
  };


  if (!user) {
    return <div className="text-white p-6">Loading profile...</div>;
  }


  return (
    <>
      <UpperNavbar />

      <div className="w-full min-h-screen bg-black px-4 md:px-6 py-8 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">

          {/* ====================== LEFT COLUMN (PROFILE + STATS) ====================== */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">

            {/* PROFILE CARD */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col items-center">

                {/* Avatar */}
                <div className="relative">
                  <img
                    src={user.ProfilePic ? user.ProfilePic : "/Profile.photo.5.jpg"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover shadow-lg"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0d0d0d]"></span>
                </div>

                {/* Name / Email / College */}
                <h1 className="text-xl text-white font-semibold mt-3 text-center">
                  {user.UserName}
                </h1>
                <p className="text-gray-400 text-xs mt-1">{user.Email}</p>
                <p className="text-purple-300 text-xs mt-1 text-center">
                  {user.Collage}
                </p>

                {/* Bio */}
                <p className="text-gray-400 mt-3 text-center text-xs leading-relaxed">
                  {user.Bio ? user.Bio : "No bio added yet."}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <button
                    onClick={handleFollow}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition
                      ${
                        isFollowing
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-blue-600 hover:bg-blue-500 text-white"
                      }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>

                  <button
                    onClick={handleMessage}
                    className="px-4 py-1.5 rounded-full text-xs font-medium border border-gray-700 
                    bg-white/5 hover:bg-white/10 text-white transition"
                  >
                    Message
                  </button>

                  <button
                    onClick={() => setOpenEdit(true)}
                    className="px-4 py-1.5 rounded-full text-xs font-medium bg-green-600 
                    hover:bg-green-500 text-white transition"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* STATS CARD */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-4 shadow-lg">
              <h3 className="text-gray-300 text-xs font-semibold mb-3">
                Stats
              </h3>

              <div className="flex justify-between">
                <div className="text-center flex-1">
                  <p className="text-white text-lg font-bold">
                    {user.Followers?.length || 0}
                  </p>
                  <p className="text-gray-400 text-xs">Followers</p>
                </div>

                <div className="h-10 w-px bg-gray-800 mx-2" />

                <div className="text-center flex-1">
                  <p className="text-white text-lg font-bold">
                    {user.Following?.length || 0}
                  </p>
                  <p className="text-gray-400 text-xs">Following</p>
                </div>
              </div>
            </div>

            {/* SKILLS CARD */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-4 shadow-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-300 text-xs font-semibold">Skills</h3>

                {/* ⭐ NEW BUTTON → OPEN SKILL MODAL */}
                <button
                  onClick={() => setOpenSkillModal(true)}
                  className="text-blue-400 text-xs underline"
                >
                  Update Skill
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {user.Skill && user.Skill.length > 0 ? (
                  user.Skill.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-[11px] rounded-full border border-gray-700 text-blue-300 bg-white/5"
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

          {/* ====================== RIGHT COLUMN (POSTS) ====================== */}
          <div className="w-full md:w-2/3">

            <h2 className="text-xl font-semibold text-white mb-3">
              Your Posts
            </h2>

            <div className="space-y-4">
              {posts.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  You haven’t posted anything yet.
                </p>
              ) : (
                posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-5 shadow-lg
                    hover:border-gray-600 transition-all"
                  >
                    {/* Header row: avatar + name + time */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.ProfilePic ? user.ProfilePic : "/Profile.photo.5.jpg"}
                          alt="Profile"
                          className="w-9 h-9 rounded-full object-cover border border-gray-700"
                        />
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {user.UserName}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            {user.Collage}
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-500">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Content */}
                    <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Divider */}
                    <div className="mt-4 border-t border-gray-800"></div>

                    {/* Actions row */}
                    <div className="flex justify-around mt-2 text-gray-300 text-xs">

                      <button className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/5 transition">
                        <AiFillLike size={16} />
                        <span>{post.likes?.length || 0}</span>
                        <span>Like</span>
                      </button>

                      <button className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/5 transition">
                        <FaRegCommentDots size={16} />
                        <span>{post.comments?.length || 0}</span>
                        <span>Comments</span>
                      </button>

                      <button className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/5 transition">
                        <IoShareOutline size={16} />
                        <span>{post.shares || 0}</span>
                        <span>Share</span>
                      </button>

                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ====================== EDIT PROFILE MODAL ====================== */}
      {openEdit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#111] border border-gray-700 rounded-2xl p-6 w-full max-w-md text-white shadow-2xl">

            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <input
              className="w-full bg-black border border-gray-700 p-2 rounded-lg text-white mb-3 text-sm"
              placeholder="Name"
              defaultValue={user.UserName}
            />

            <input
              className="w-full bg-black border border-gray-700 p-2 rounded-lg text-white mb-3 text-sm"
              placeholder="Email"
              defaultValue={user.Email}
            />

            <textarea
              className="w-full bg-black border border-gray-700 p-2 rounded-lg text-white mb-3 text-sm"
              placeholder="Bio"
              rows="3"
              defaultValue={user.Bio}
            ></textarea>

            {/* <input
              className="w-full bg-black border border-gray-700 p-2 rounded-lg text-white mb-3 text-sm"
              placeholder="Skills (comma separated)"
              defaultValue={user.Skill?.join(", ")}
            /> */}
            <input
              type="password"
              placeholder="Old Password"
              className="w-full bg-black border border-gray-700 p-2 rounded-lg text-sm mb-3"
            />

            <input
              type="password"
              className="w-full bg-black border border-gray-700 p-2 rounded-lg text-white mb-3 text-sm"
              placeholder="New Password"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-sm"
                onClick={() => setOpenEdit(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 text-sm"
                // onClick={handleSaveProfile}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
            {/* ====================== SKILL SELECT MODAL (ORIGINAL DESIGN) ====================== */}
      {openSkillModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="relative w-full max-w-2xl bg-[#0f0f0f] text-white p-6 rounded-2xl border border-gray-800">

            {/* ❌ CLOSE BUTTON */}
            <button
              onClick={() => setOpenSkillModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Skills</h2>

            {/* INPUT */}
            <div className="flex gap-2">
              <input
                className="w-full px-4 py-2 h-12 rounded-xl bg-black/40 border border-gray-700"
                value={inputSkill}
                onChange={(e) => setInputSkill(e.target.value)}
                placeholder="Type a skill..."
                onKeyDown={(e) => e.key === "Enter" && addTypedSkill()}
              />
            </div>

            {/* SELECTED SKILLS */}
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedSkills.length === 0 ? (
                <p className="text-gray-400 text-sm">No skills selected</p>
              ) : (
                selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-600 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="text-white text-lg">
                      ×
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* SUGGESTED SKILLS */}
            <h3 className="text-gray-300 font-semibold mt-6 mb-2">Suggested Skills</h3>

            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2">
              {allSkills.map((skill) => (
                <button
                  key={skill}
                  className="px-3 py-1 bg-black/40 border border-gray-600 rounded-full text-xs hover:bg-blue-500 hover:text-white transition"
                  onClick={() => addSuggestedSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>

            {/* SAVE BUTTON */}
            <button
              onClick={updateSkillAPI}
              className="w-full mt-8 py-3 h-12 bg-blue-600 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
            >
              Save Skills
            </button>

          </div>
        </div>
      )}


    </>
  );
}

export default Profile;
