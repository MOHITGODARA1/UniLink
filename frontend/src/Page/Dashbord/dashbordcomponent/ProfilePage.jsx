import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // Edit profile modal
  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editBio, setEditBio] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Skills modal
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [inputSkill, setInputSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Comments + Like UI states
  const [openComments, setOpenComments] = useState({});
  const [commentText, setCommentText] = useState({});

  const token = localStorage.getItem("Token");

  const allSkills = [
    "JavaScript","React.js","Node.js","Express.js","MongoDB","HTML","CSS","Tailwind CSS",
    "Redux","Next.js","TypeScript","Git","GitHub","Java","Spring Boot","Python",
    "Django","Flask","C","C++","SQL","MySQL","PostgreSQL","PHP","Laravel","DevOps",
    "Docker","Kubernetes","Linux","Cloud Computing","AWS","Firebase","DSA",
    "Machine Learning","Deep Learning","AI","Cyber Security","Blockchain",
    "Data Engineering","TensorFlow","OpenCV"
  ];

  // ====================== FETCH USER POSTS ======================

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

  // ====================== FETCH USER DATA ======================

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/dashboard`, {
          headers: { authorization: token },
        });

        const u = res.data.user;

        setUser(u);
        setSelectedSkills(u.Skill || []);

        fetchUserPosts(u._id);
      } catch (err) {
        console.log("Error loading user", err);
      }
    };

    loadUser();
  }, []);

  // ====================== UPDATE PROFILE ======================

  const saveProfile = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/update-profile`, {
        userId: user._id,
        UserName: editName,
        Email: editEmail,
        Bio: editBio,
        OldPassword: oldPassword,
        NewPassword: newPassword,
      });

      alert("Profile Updated Successfully!");
      setUser(res.data.user);
      setOpenEdit(false);

    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  // ====================== LIKE SYSTEM ======================

  const toggleLike = async (postId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/toggle-like`, {
        postId,
        userId: user._id,
      });

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, likes: res.data.likesCount }
            : p
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ====================== COMMENTS ======================

  const addComment = async (postId) => {
    if (!commentText[postId]?.trim()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/add-comment`, {
        postId,
        userId: user._id,
        text: commentText[postId],
      });

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, comments: res.data.comments } : p
        )
      );

      setCommentText((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.log(err);
    }
  };

  // ====================== SKILL FUNCTIONS ======================

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
      alert("Failed to update skills");
      console.log(err);
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

          {/* ====================== LEFT COLUMN ====================== */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">

            {/* ====================== PROFILE CARD ====================== */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col items-center">

                {/* Avatar */}
                <img
                  src={user.ProfilePic || "/Profile.photo.5.jpg"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover shadow-lg"
                />

                {/* USERNAME */}
                <div className="mt-4 text-center">
                  <h1 className="text-xl text-white font-semibold">{user.UserName}</h1>
                </div>

                {/* EMAIL */}
                <div className="mt-3 text-center">
                  <p className="text-gray-300 text-xs">{user.Email}</p>
                </div>

                {/* COLLEGE */}
                <div className="mt-3 text-center">
                  <p className="text-purple-300 text-xs font-medium">{user.Collage}</p>
                </div>

                {/* BIO */}
                <div className="mt-4 text-center max-w-[90%]">
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {user.Bio || "No bio added yet."}
                  </p>
                </div>

                {/* EDIT BUTTON */}
                <button
                  onClick={() => {
                    setEditName(user.UserName);
                    setEditEmail(user.Email);
                    setEditBio(user.Bio || "");
                    setOldPassword("");
                    setNewPassword("");
                    setOpenEdit(true);
                  }}
                  className="mt-5 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-full text-xs"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* ====================== STATS ====================== */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-4 shadow-lg">
              <h3 className="text-gray-300 text-xs font-semibold mb-3">Stats</h3>

              <div className="flex justify-between">
                <div className="text-center flex-1">
                  <p className="text-white text-lg font-bold">{user.Followers?.length || 0}</p>
                  <p className="text-gray-400 text-xs">Followers</p>
                </div>

                <div className="h-10 w-px bg-gray-800 mx-2" />

                <div className="text-center flex-1">
                  <p className="text-white text-lg font-bold">{user.Following?.length || 0}</p>
                  <p className="text-gray-400 text-xs">Following</p>
                </div>
              </div>
            </div>

            {/* ====================== SKILLS ====================== */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-4 shadow-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-300 text-xs font-semibold">Skills</h3>

                <button
                  onClick={() => setOpenSkillModal(true)}
                  className="text-blue-400 text-xs underline"
                >
                  Update Skill
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSkills.length > 0 ? (
                  selectedSkills.map((skill, index) => (
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

            <h2 className="text-xl text-white font-semibold mb-3">Your Posts</h2>

            <div className="space-y-4">
              {posts.length === 0 ? (
                <p className="text-gray-500 text-sm">You haven't posted anything yet.</p>
              ) : (
                posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-5 shadow-lg"
                  >

                    {/* HEADER */}
                    <div className="flex items-center mb-3">
                      <img
                        src={user.ProfilePic || "/Profile.photo.5.jpg"}
                        className="w-9 h-9 rounded-full border border-gray-700 mr-3"
                      />
                      <div>
                        <p className="text-sm text-white font-semibold">{user.UserName}</p>
                        <p className="text-[11px] text-gray-400">{user.Collage}</p>
                      </div>
                    </div>

                    {/* TEXT CONTENT */}
                    <p className="text-gray-300 text-sm">{post.content}</p>

                    {/* MEDIA PREVIEW */}
                    {post.mediaUrl && (
                      <div className="mt-3 rounded-xl overflow-hidden border border-gray-700">
                        {post.mediaType === "image" ? (
                          <img
                            src={post.mediaUrl}
                            className="w-full max-h-96 object-cover"
                          />
                        ) : (
                          <video
                            src={post.mediaUrl}
                            controls
                            className="w-full max-h-96 object-cover"
                          />
                        )}
                      </div>
                    )}

                    <div className="border-t border-gray-800 my-3"></div>

                    {/* ACTION BAR */}
                    <div className="flex justify-between text-gray-300 text-xs">

                      {/* LIKE */}
                      <button
                        onClick={() => toggleLike(post._id)}
                        className="flex items-center gap-2 hover:text-blue-400"
                      >
                        <AiFillLike
                          size={16}
                          className={
                            post.likes?.includes(user._id)
                              ? "text-blue-500"
                              : "text-gray-300"
                          }
                        />
                        <span>{post.likes?.length || 0}</span>
                        <span>Like</span>
                      </button>

                      {/* COMMENT */}
                      <button
                        onClick={() =>
                          setOpenComments((prev) => ({
                            ...prev,
                            [post._id]: !prev[post._id],
                          }))
                        }
                        className="flex items-center gap-2 hover:text-blue-400"
                      >
                        <FaRegCommentDots size={16} />
                        <span>{post.comments?.length || 0}</span>
                        <span>Comments</span>
                      </button>

                      <button className="flex items-center gap-2">
                        <IoShareOutline size={16} />
                        <span>Share</span>
                      </button>
                    </div>

                    {/* COMMENTS */}
                    {openComments[post._id] && (
                      <div className="mt-4 p-3 bg-black/30 border border-gray-800 rounded-xl">

                        {/* COMMENT INPUT */}
                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            value={commentText[post._id] || ""}
                            onChange={(e) =>
                              setCommentText((prev) => ({
                                ...prev,
                                [post._id]: e.target.value,
                              }))
                            }
                            className="flex-1 bg-black border border-gray-700 rounded-lg px-3 py-1 text-gray-200"
                            placeholder="Write a comment..."
                          />

                          <button
                            onClick={() => addComment(post._id)}
                            className="px-3 py-1 bg-blue-600 rounded-lg text-white"
                          >
                            Post
                          </button>
                        </div>

                        {/* SHOW COMMENTS */}
                        {post.comments?.map((c) => (
                          <div key={c._id} className="mb-2">
                            <p className="text-blue-300 text-xs font-semibold">
                              {c.userId?.UserName || "Unknown User"}
                            </p>
                            <p className="text-gray-300 text-sm">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ====================== EDIT PROFILE MODAL ====================== */}
      {openEdit && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[#111] p-6 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-md">

            <h2 className="text-xl font-bold text-white mb-4">Edit Profile</h2>

            {/* NAME */}
            <label className="text-xs text-gray-400">Name</label>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-black border border-gray-700 p-2 rounded-lg text-white mb-3"
            />

            {/* EMAIL */}
            <label className="text-xs text-gray-400">Email</label>
            <input
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full bg-black border border-gray-700 p-2 rounded-lg text-white mb-3"
            />

            {/* BIO */}
            <label className="text-xs text-gray-400">Bio</label>
            <textarea
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              className="w-full bg-black border border-gray-700 p-2 rounded-lg text-white mb-3"
              rows="3"
            ></textarea>

            {/* OLD PASSWORD */}
            <label className="text-xs text-gray-400">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full bg-black border border-gray-700 p-2 rounded-lg mb-3"
            />

            {/* NEW PASSWORD */}
            <label className="text-xs text-gray-400">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-black border border-gray-700 p-2 rounded-lg mb-3"
            />

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setOpenEdit(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={saveProfile}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================== SKILL MODAL ====================== */}
      {openSkillModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="relative w-full max-w-2xl bg-[#0f0f0f] text-white p-6 rounded-2xl border border-gray-800">

            <button
              onClick={() => setOpenSkillModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Skills</h2>

            <div className="flex gap-2">
              <input
                className="w-full px-4 py-2 h-12 rounded-xl bg-black/40 border border-gray-700"
                value={inputSkill}
                onChange={(e) => setInputSkill(e.target.value)}
                placeholder="Type a skill..."
                onKeyDown={(e) => e.key === "Enter" && addTypedSkill()}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {selectedSkills.length > 0 ? (
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
              ) : (
                <p className="text-gray-400 text-sm">No skills selected</p>
              )}
            </div>

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
