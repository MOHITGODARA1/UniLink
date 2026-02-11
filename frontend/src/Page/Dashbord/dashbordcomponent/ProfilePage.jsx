import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editBio, setEditBio] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [inputSkill, setInputSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

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

  const fetchUserPosts = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/fetch-user-posts?userId=${id}`
      );
      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API}/dashboard`, {
        headers: { authorization: token },
      });

      setUser(res.data.user);
      setSelectedSkills(res.data.user.Skill || []);
      fetchUserPosts(res.data.user._id);
    };

    loadUser();
  }, []);

  if (!user) return null;

  return (
    <>
      <UpperNavbar />
      <div className="mb-2 mt-4 ml-4 sm:mb-5">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-wide">
                Uni<span className="text-gray-500 font-normal">Link</span>
              </h1>
              <p className="text-sm text-gray-500">
                Connect with students from your college
              </p>
            </div>
      <div className="w-full min-h-screen bg-gray-50 pt-4 px-3 sm:px-6 flex justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT PROFILE COLUMN */}
          <div className="md:col-span-1 space-y-4">

            {/* PROFILE CARD */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
              <img
                src={user.ProfilePic || "/Profile.photo.5.jpg"}
                className="w-24 h-24 rounded-full mx-auto border border-gray-300 object-cover"
              />
              <h1 className="mt-4 text-lg font-semibold text-gray-900">
                {user.UserName}
              </h1>
              <p className="text-sm text-gray-500">{user.Email}</p>
              <p className="text-xs text-blue-600 mt-1">{user.Collage}</p>
              <p className="text-sm text-gray-600 mt-3">
                {user.Bio || "No bio added yet."}
              </p>

              <button
                onClick={() => {
                  setEditName(user.UserName);
                  setEditEmail(user.Email);
                  setEditBio(user.Bio || "");
                  setOpenEdit(true);
                }}
                className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>

            {/* STATS */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-around">
              <div className="text-center">
                <p className="text-lg font-semibold">{user.Followers?.length || 0}</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">{user.Following?.length || 0}</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
            </div>

            {/* SKILLS */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold">Skills</h3>
                <button
                  onClick={() => setOpenSkillModal(true)}
                  className="text-blue-600 text-xs"
                >
                  Update
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.length ? (
                  selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs bg-gray-100 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">No skills added</p>
                )}
              </div>
            </div>
          </div>

          {/* POSTS COLUMN */}
          <div className="md:col-span-2 space-y-4">

            <h2 className="text-lg font-semibold text-gray-900">
              Your Posts
            </h2>

            {posts.length === 0 ? (
              <p className="text-gray-500 text-sm">No posts yet.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white border border-gray-200 rounded-xl p-4"
                >
                  <p className="text-sm text-gray-800">{post.content}</p>

                  {post.mediaUrl && (
                    <div className="mt-3 border rounded-lg overflow-hidden">
                      {post.mediaType === "image" ? (
                        <img src={post.mediaUrl} className="w-full" />
                      ) : (
                        <video src={post.mediaUrl} controls className="w-full" />
                      )}
                    </div>
                  )}

                  <div className="flex justify-between mt-3 pt-3 border-t text-sm text-gray-600">
                    <button className="flex items-center gap-1">
                      <AiFillLike /> {post.likes?.length || 0}
                    </button>
                    <button className="flex items-center gap-1">
                      <FaRegCommentDots /> {post.comments?.length || 0}
                    </button>
                    <button className="flex items-center gap-1">
                      <IoShareOutline /> Share
                    </button>
                  </div>
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