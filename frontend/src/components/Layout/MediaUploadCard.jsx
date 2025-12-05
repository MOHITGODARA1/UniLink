// src/components/Post/MediaUploadCard.jsx
import { useState } from "react";
import axios from "axios";

function MediaUploadCard({ type = "image", authorId, Collage, onClose, onSuccess }) {
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("media", file);
      formData.append("content", note);
      formData.append("authorId", authorId);
      formData.append("Collage", Collage);
      formData.append("mediaType", type);

      await axios.post(`${import.meta.env.VITE_API}/Uplode-Post`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setIsUploading(false);
      setNote("");
      setFile(null);
      setPreview("");

      if (onSuccess) onSuccess();
      onClose();
      alert("Media uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      setIsUploading(false);
      alert("Upload failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      {/* MAIN CARD */}
      <div className="relative bg-[#111111] rounded-2xl shadow-xl border border-gray-800 w-[90%] max-w-lg p-5">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl transition"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-white text-xl font-semibold mb-4">
          {type === "video" ? "Upload Video" : "Upload Photo"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NOTE INPUT */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Add a note (optional)</label>
            <textarea
              className="w-full bg-black border border-gray-700 rounded-xl p-3 text-gray-200 text-sm resize-none focus:border-blue-500 outline-none"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Say something..."
            />
          </div>

          {/* SELECT FILE */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              {type === "video" ? "Select a video" : "Select a photo"}
            </label>
            <input
              type="file"
              accept={type === "video" ? "video/*" : "image/*"}
              onChange={handleFileChange}
              className="w-full text-gray-300 text-sm cursor-pointer"
            />
          </div>

          {/* CLEAN & SIMPLE MEDIA PREVIEW */}
          {preview && (
            <div className="mt-3">
              
              {/* Friendly Label */}
              <p className="text-gray-300 text-sm mb-2 font-medium">
                {type === "video" ? "Selected Video" : "Selected Photo"}
              </p>

              {/* Preview Box */}
              <div className="border border-gray-700 rounded-xl bg-black h-64 flex items-center justify-center overflow-hidden shadow-md">

                {type === "video" ? (
                  <video
                    src={preview}
                    controls
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                )}

              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm hover:bg-gray-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-500 disabled:opacity-60 transition"
            >
              {isUploading ? "Uploading…" : "Upload"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default MediaUploadCard;
