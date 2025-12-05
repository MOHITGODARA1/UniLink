import { useState, useEffect } from "react";
import axios from "axios";
import MediaUploadCard from "../../../components/Layout/MediaUploadCard";

function Postuplode() {
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const [showMediaCard, setShowMediaCard] = useState(false);
  const [mediaType, setMediaType] = useState("image");

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const loadUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/dashboard`, {
          headers: { authorization: token }
        });

        setUser(res.data.user);
      } catch (err) {
        console.log("Error loading user:", err);
      }
    };

    loadUser();
  }, []);

  const handleUpload = async () => {
    const authorId = localStorage.getItem("userId");
    const Collage = localStorage.getItem("userCollage");

    if (!content.trim()) return alert("Write something!");

    try {
      await axios.post(`${import.meta.env.VITE_API}/Uplode-Post`, {
        content,
        authorId,
        Collage
      });

      setContent("");
      alert("Post uploaded successfully!");
    } catch (err) {
      console.log("Error:", err);
      alert("Something went wrong!");
    }
  };

  if (!user) return null;

  const authorId = localStorage.getItem("userId");
  const Collage = localStorage.getItem("userCollage");

  return (
    <>
      {/* MAIN CARD */}
      <div className="bg-[#0d0d0d] border border-gray-800 p-5 rounded-2xl shadow-xl">
        
        {/* TOP ROW */}
        <div className="flex items-start gap-3">
          <img
            src={user.ProfilePic || "/Profile.photo.5.jpg"}
            className="w-12 h-12 rounded-full border border-gray-700 object-cover"
          />

          <textarea
            placeholder="Start a post..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-black p-3 rounded-xl border border-gray-700 text-gray-300 resize-none focus:border-blue-500 outline-none"
            rows="3"
          />
        </div>

        <div className="border-b border-gray-800 my-4"></div>

        {/* BOTTOM ROW */}
        <div className="flex justify-between items-center px-2">
          <div className="flex gap-4">
            <button
              className="text-gray-300 hover:text-white text-sm"
              onClick={() => {
                setMediaType("video");
                setShowMediaCard(true);
              }}
            >
              📹 Video
            </button>

            <button
              className="text-gray-300 hover:text-white text-sm"
              onClick={() => {
                setMediaType("image");
                setShowMediaCard(true);
              }}
            >
              🖼 Photo
            </button>

            <button className="text-gray-300 hover:text-white text-sm">
              📝 Article
            </button>
          </div>

          <button
            onClick={handleUpload}
            className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-500 text-sm text-white"
          >
            Post
          </button>
        </div>
      </div>

      {/* MEDIA UPLOAD CARD */}
      {showMediaCard && (
        <MediaUploadCard
          type={mediaType}
          authorId={authorId}
          Collage={Collage}
          onClose={() => setShowMediaCard(false)}
          onSuccess={() => console.log("Media post uploaded")}
        />
      )}
    </>
  );
}

export default Postuplode;
