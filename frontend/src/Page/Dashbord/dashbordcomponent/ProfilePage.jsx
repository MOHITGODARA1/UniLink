import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

const storedUser = JSON.parse(localStorage.getItem("Userdata"));
const userId = storedUser?._id;

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
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API}/dashboard?userId=${userId}`
        );

        setUser(res.data.user);
        setSelectedSkills(res.data.user.Skill || []);
        fetchUserPosts(res.data.user._id);
      } catch (err) {
        console.log("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;
 
  return (
    <div className="min-h-screen bg-gray-50">
      <UpperNavbar />
      
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 md:mt-34 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-wide">
          Uni<span className="text-blue-600 font-normal">Link</span>
        </h1>
        <p className="text-sm text-gray-500">Your Profile</p>
      </div>

      <div className="max-w-6xl md:mt-18 mx-auto px-0 lg:px-6 py-0 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">

          {/* LEFT PROFILE COLUMN */}
          <div className="lg:col-span-1">
            {/* PROFILE CARD */}
            <div className="bg-white border-b lg:border lg:rounded-lg shadow-sm">
              {/* Cover Photo Area */}
              <div className="h-24 lg:h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
                <div className="absolute top-2 right-2 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-12 lg:-bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <img
                      src={user.ProfilePic || "/Profile.photo.5.jpg"}
                      alt="Profile"
                      className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-14 lg:pt-20 px-4 lg:px-6 pb-6 text-center">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {user.UserName}
                </h1>
                <p className="text-sm text-gray-500 mt-1">{user.Email}</p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-blue-50 rounded-full">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-blue-600">{user.Collage}</span>
                </div>
                
                {user.Bio ? (
                  <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                    {user.Bio}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 italic mt-4">
                    No bio added yet
                  </p>
                )}

                <button
                  onClick={() => {
                    setEditName(user.UserName);
                    setEditEmail(user.Email);
                    setEditBio(user.Bio || "");
                    setOpenEdit(true);
                  }}
                  className="mt-5 w-full px-4 py-2.5 text-sm font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              </div>

              {/* STATS */}
              <div className="border-t border-gray-200 px-4 lg:px-6 py-4">
                <div className="flex justify-around">
                  <div className="text-center">
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">
                      {user.Followers?.length || 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Followers</p>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">
                      {user.Following?.length || 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Following</p>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">
                      {posts.length}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Posts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SKILLS CARD */}
            <div className="bg-white border-t lg:border lg:rounded-lg shadow-sm mt-0 lg:mt-4">
              <div className="px-4 lg:px-6 py-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Skills & Expertise
                  </h3>
                  <button
                    onClick={() => setOpenSkillModal(true)}
                    className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.length ? (
                    selectedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <div className="w-full text-center py-6">
                      <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <p className="text-xs text-gray-400">No skills added yet</p>
                      <button
                        onClick={() => setOpenSkillModal(true)}
                        className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Add your first skill
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* POSTS COLUMN */}
          <div className="lg:col-span-2 mt-4 lg:mt-0">
            <div className="bg-white border-b lg:border-0 px-4 lg:px-0 py-4 lg:py-0 lg:mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                Your Posts
                <span className="text-sm font-normal text-gray-500">({posts.length})</span>
              </h2>
            </div>

            {posts.length === 0 ? (
              <div className="bg-white border lg:border lg:rounded-lg shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500 text-sm">Share your thoughts with your community!</p>
              </div>
            ) : (
              <div className="space-y-0 lg:space-y-4">
                {posts.map((post, index) => (
                  <div key={post._id}>
                    <div className="bg-white border-x lg:border lg:rounded-lg shadow-sm">
                      {/* POST HEADER */}
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.ProfilePic || "/Profile.photo.5.jpg"}
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {user.UserName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(post.createdAt).toLocaleString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>

                      {/* TEXT CONTENT */}
                      {post.content && (
                        <div className="px-4 pb-3">
                          <p className="text-sm md:text-base text-gray-900 leading-relaxed whitespace-pre-line">
                            {post.content}
                          </p>
                        </div>
                      )}

                      {/* MEDIA */}
                      {post.mediaUrl && (
                        <div className="w-full bg-black">
                          {post.mediaType === "video" ? (
                            <video
                              src={post.mediaUrl}
                              controls
                              className="w-full max-h-[600px] object-contain"
                            />
                          ) : (
                            <img
                              src={post.mediaUrl}
                              alt="Post media"
                              className="w-full max-h-[600px] object-contain"
                            />
                          )}
                        </div>
                      )}

                      {/* ACTIONS BAR */}
                      <div className="px-4 py-2 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors">
                              <AiOutlineLike className="text-xl md:text-2xl" />
                            </button>

                            <button className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors">
                              <FaRegCommentDots className="text-lg md:text-xl" />
                            </button>

                            <button className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors">
                              <IoShareOutline className="text-xl md:text-2xl" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* LIKES COUNT */}
                      {post.likes?.length > 0 && (
                        <div className="px-4 pb-3">
                          <p className="text-sm font-semibold text-gray-900">
                            {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
                          </p>
                        </div>
                      )}

                      {/* COMMENTS PREVIEW */}
                      {post.comments?.length > 0 && (
                        <div className="px-4 pb-3">
                          <button className="text-sm text-gray-500 hover:text-gray-700">
                            View all {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Mobile Divider */}
                    {index < posts.length - 1 && (
                      <div className="lg:hidden border-b border-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;