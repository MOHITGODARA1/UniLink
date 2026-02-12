import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [showComments, setShowComments] = useState({});
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const Collage = localStorage.getItem("userCollage");

  // FETCH POSTS
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API}/Post-fetch?Collage=${Collage}`
      );

      const formatted = res.data.posts.map((post) => ({
        ...post,
        liked: post.likes?.includes(userId),
      }));

      setPosts(formatted);
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // LIKE / UNLIKE
  const toggleLike = async (postId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/toggle-like`, {
        postId,
        userId,
      });

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, liked: !p.liked, likes: res.data.likes }
            : p
        )
      );
    } catch (err) {
      console.log("Like Error:", err);
    }
  };

  // ADD COMMENT
  const addComment = async (postId) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/add-comment`, {
        postId,
        userId,
        text,
      });

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, comments: res.data.comments } : p
        )
      );

      setCommentText((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.log("Comment Error:", err);
    }
  };

  // TOGGLE COMMENTS
  const toggleCommentsSection = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // HANDLE ENTER KEY FOR COMMENT
  const handleCommentKeyPress = (e, postId) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addComment(postId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Feed Container */}
      <div className="max-w-2xl mx-auto">
        {posts.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center mt-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Be the first to share something with your community!</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <div key={post._id}>
              {/* POST CARD */}
              <div className="bg-white border-x border-gray-200 md:border md:rounded-lg md:my-6">
                {/* POST HEADER */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorId?.ProfilePic || "/Profile.photo.5.jpg"}
                      alt="User"
                      className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {post.authorId?.UserName}
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
                {post.mediaUrl && post.mediaType !== "none" && (
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
                    {/* Left Actions */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(post._id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          post.liked ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        {post.liked ? (
                          <AiFillLike className="text-xl md:text-2xl" />
                        ) : (
                          <AiOutlineLike className="text-xl md:text-2xl" />
                        )}
                      </button>

                      <button
                        onClick={() => toggleCommentsSection(post._id)}
                        className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors"
                      >
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
                  <div className="px-4 pb-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
                    </p>
                  </div>
                )}

                {/* COMMENTS PREVIEW */}
                {post.comments?.length > 0 && !showComments[post._id] && (
                  <div className="px-4 pb-3">
                    <button
                      onClick={() => toggleCommentsSection(post._id)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      View all {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                    </button>
                  </div>
                )}

                {/* COMMENTS SECTION */}
                {showComments[post._id] && (
                  <div className="border-t border-gray-200">
                    {/* COMMENTS LIST */}
                    <div className="px-4 py-3 max-h-96 overflow-y-auto">
                      {post.comments?.length === 0 ? (
                        <p className="text-center text-gray-500 text-sm py-4">
                          No comments yet. Be the first to comment!
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {post.comments?.map((c) => (
                            <div key={c._id} className="flex gap-3">
                              <img
                                src={c.userId?.ProfilePic || "/Profile.photo.5.jpg"}
                                alt="Commenter"
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="bg-gray-100 rounded-2xl px-3 py-2">
                                  <p className="text-sm font-semibold text-gray-900">
                                    {c.userId?.UserName}
                                  </p>
                                  <p className="text-sm text-gray-800 break-words">{c.text}</p>
                                </div>
                                <div className="flex items-center gap-3 mt-1 px-3">
                                  <span className="text-xs text-gray-500">
                                    {new Date(c.createdAt).toLocaleString('en-US', { 
                                      month: 'short', 
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                  <button className="text-xs text-gray-600 hover:text-gray-900 font-medium">
                                    Like
                                  </button>
                                  <button className="text-xs text-gray-600 hover:text-gray-900 font-medium">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ADD COMMENT INPUT */}
                    <div className="px-4 py-3 border-t border-gray-200">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={commentText[post._id] || ""}
                          onChange={(e) =>
                            setCommentText((prev) => ({
                              ...prev,
                              [post._id]: e.target.value,
                            }))
                          }
                          onKeyPress={(e) => handleCommentKeyPress(e, post._id)}
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-gray-400 focus:ring-0"
                        />
                        <button
                          onClick={() => addComment(post._id)}
                          disabled={!commentText[post._id]?.trim()}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:text-blue-300 disabled:cursor-not-allowed transition-colors px-3"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ADD COMMENT (WHEN COMMENTS CLOSED) */}
                {!showComments[post._id] && (
                  <div className="px-4 pb-4 border-t border-gray-200 pt-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentText[post._id] || ""}
                        onChange={(e) =>
                          setCommentText((prev) => ({
                            ...prev,
                            [post._id]: e.target.value,
                          }))
                        }
                        onKeyPress={(e) => handleCommentKeyPress(e, post._id)}
                        onFocus={() => toggleCommentsSection(post._id)}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-gray-400 focus:ring-0"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* MOBILE DIVIDER - Continuous feed on mobile */}
              {index < posts.length - 1 && (
                <div className="md:hidden border-b border-gray-200"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;