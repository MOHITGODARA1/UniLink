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
          headers: { authorization: token },
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
        Collage,
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
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">
        
        {/* TOP ROW */}
        <div className="flex gap-3 items-start">
          <img
            src={user.ProfilePic || "/Profile.photo.5.jpg"}
            alt="User"
            className="
              w-10 h-10 sm:w-11 sm:h-11
              rounded-full
              border border-gray-300
              object-cover
              shrink-0
            "
          />

          <textarea
            placeholder="Share something with your college..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            className="
              w-full
              resize-none
              bg-gray-50
              border border-gray-200
              rounded-lg
              p-3
              text-sm
              text-gray-800
              placeholder-gray-400
              focus:outline-none
              focus:border-blue-500
            "
          />
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-200 my-4" />

        {/* BOTTOM ROW */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-2 text-sm">
            <button
              onClick={() => {
                setMediaType("video");
                setShowMediaCard(true);
              }}
              className="
                flex items-center gap-1
                px-3 py-1.5
                rounded-md
                text-gray-600
                hover:bg-gray-100
                hover:text-gray-900
                transition
              "
            >
              📹 <span>Video</span>
            </button>

            <button
              onClick={() => {
                setMediaType("image");
                setShowMediaCard(true);
              }}
              className="
                flex items-center gap-1
                px-3 py-1.5
                rounded-md
                text-gray-600
                hover:bg-gray-100
                hover:text-gray-900
                transition
              "
            >
              🖼 <span>Photo</span>
            </button>

            <button
              className="
                flex items-center gap-1
                px-3 py-1.5
                rounded-md
                text-gray-600
                hover:bg-gray-100
                hover:text-gray-900
                transition
              "
            >
              📝 <span>Article</span>
            </button>
          </div>

          {/* POST BUTTON */}
          <button
            onClick={handleUpload}
            className="
              w-full sm:w-auto
              bg-blue-600
              text-white
              text-sm
              font-medium
              px-6 py-2
              rounded-lg
              hover:bg-blue-700
              transition
            "
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