import { useState, useEffect } from "react";
import axios from "axios";
import MediaUploadCard from "../../../components/Layout/MediaUploadCard";

function Postuplode() {
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const [showMediaCard, setShowMediaCard] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const [isPosting, setIsPosting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
      setIsPosting(true);
      await axios.post(`${import.meta.env.VITE_API}/Uplode-Post`, {
        content,
        authorId,
        Collage,
      });

      setContent("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.log("Error:", err);
      alert("Something went wrong!");
    } finally {
      setIsPosting(false);
    }
  };

  if (!user) return null;

  const authorId = localStorage.getItem("userId");
  const Collage = localStorage.getItem("userCollage");

  return (
    <>
      {/* SUCCESS NOTIFICATION */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Post uploaded successfully!</span>
          </div>
        </div>
      )}

      {/* MAIN CARD */}
      <div className="bg-white border border-gray-200 md:rounded-lg shadow-sm">
        
        {/* TOP ROW */}
        <div className="p-4">
          <div className="flex gap-3 items-start">
            <img
              src={user.ProfilePic || "/Profile.photo.5.jpg"}
              alt="User"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover flex-shrink-0"
            />

            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="3"
              className="
                w-full
                resize-none
                border-0
                p-0
                text-sm md:text-base
                text-gray-900
                placeholder-gray-500
                focus:outline-none
                focus:ring-0
              "
            />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-200" />

        {/* BOTTOM ROW */}
        <div className="p-4 flex items-center justify-between">
          
          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => {
                setMediaType("video");
                setShowMediaCard(true);
              }}
              className="
                flex items-center gap-1.5
                px-3 py-2
                rounded-lg
                text-gray-600
                hover:bg-gray-100
                transition-colors
                text-sm md:text-base
              "
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              <span className="hidden sm:inline font-medium">Video</span>
            </button>

            <button
              onClick={() => {
                setMediaType("image");
                setShowMediaCard(true);
              }}
              className="
                flex items-center gap-1.5
                px-3 py-2
                rounded-lg
                text-gray-600
                hover:bg-gray-100
                transition-colors
                text-sm md:text-base
              "
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline font-medium">Photo</span>
            </button>

            <button
              className="
                flex items-center gap-1.5
                px-3 py-2
                rounded-lg
                text-gray-600
                hover:bg-gray-100
                transition-colors
                text-sm md:text-base
              "
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
              <span className="hidden sm:inline font-medium">Article</span>
            </button>
          </div>

          {/* POST BUTTON */}
          <button
            onClick={handleUpload}
            disabled={!content.trim() || isPosting}
            className="
              bg-blue-600
              text-white
              text-sm
              font-semibold
              px-5 py-2
              rounded-lg
              hover:bg-blue-700
              disabled:bg-gray-300
              disabled:cursor-not-allowed
              transition-colors
              flex items-center gap-2
            "
          >
            {isPosting ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Posting...</span>
              </>
            ) : (
              "Post"
            )}
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
          onSuccess={() => {
            console.log("Media post uploaded");
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
          }}
        />
      )}

      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translate(-50%, -100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default Postuplode;