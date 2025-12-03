import { useState } from "react";
import axios from "axios";

function Postuplode() {
  const [content, setContent] = useState("");

  const handleUpload = async () => {
    const authorId = localStorage.getItem("userId");
    const Collage = localStorage.getItem("userCollage");

    if (!authorId || !Collage) {
      alert("User info missing!");
      return;
    }

    if (!content.trim()) {
      alert("Please write something before posting.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API}/Uplode-Post`, {
        content,
        authorId,
        Collage
      });

      alert("Post uploaded successfully!");
      setContent(""); // reset input
    } catch (err) {
      console.log("Error uploading post:", err);
      alert("Failed to upload post.");
    }
  };

  return (
    <div
      className="
        w-[90%] max-w-2xl 
        bg-black 
        border border-gray-800 
        rounded-2xl 
        p-5 
        text-white 
        shadow-xl
      "
    >
      {/* TOP: Avatar + Input */}
      <div className="flex items-center gap-4">
        
        <img
          src="/profile.png"
          alt="profile"
          className="w-12 h-12 rounded-full border border-gray-700 object-cover"
        />

        {/* Textarea */}
        <textarea
          placeholder="Start a post..."
          className="
            w-full 
            bg-black 
            border border-gray-700 
            rounded-xl 
            p-4 
            text-gray-300 
            placeholder-gray-500 
            resize-none 
            focus:border-blue-500 
            focus:outline-none 
            transition
          "
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800 my-5"></div>

      {/* ACTIONS */}
      <div className="flex justify-between items-center px-2">

        <div className="flex gap-3">
          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
            <i className="ri-video-line text-green-400 text-xl"></i>
            <span className="text-sm">Video</span>
          </button>

          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
            <i className="ri-image-2-line text-blue-400 text-xl"></i>
            <span className="text-sm">Photo</span>
          </button>

          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
            <i className="ri-article-line text-orange-400 text-xl"></i>
            <span className="text-sm">Write article</span>
          </button>
        </div>

        {/* POST BUTTON */}
        <button
          onClick={handleUpload}
          className="
            bg-blue-600 
            px-4 py-2 
            rounded-xl 
            text-white 
            text-sm 
            hover:bg-blue-500 
            transition
          "
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default Postuplode;
