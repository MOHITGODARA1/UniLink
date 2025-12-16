import { useState } from "react";
import axios from "axios";

function UploadPdf() {
  const [title, setTitle] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [file, setFile] = useState(null);

  const upload = async (e) => {
    e.preventDefault();

    if (!title || !uploadedBy || !file) {
      alert("All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("uploadedBy", uploadedBy);
      formData.append("pdf", file);

      await axios.post(`${import.meta.env.VITE_API}/study/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("PDF Uploaded Successfully!");

      setTitle("");
      setUploadedBy("");
      setFile(null);

    } catch (error) {
      console.log(error);
      alert("Upload Failed!");
    }
  };

  return (
    <form onSubmit={upload} className="space-y-6">

      <h2 className="text-2xl font-semibold text-white">Upload Study Resource</h2>

      {/* TITLE */}
      <div>
        <label className="text-gray-300 text-sm ml-1">PDF Title</label>
        <input
          type="text"
          className="
            w-full mt-2 px-4 py-3 bg-white/5 border border-gray-700 
            rounded-xl text-white placeholder-gray-500
            outline-none focus:border-blue-400 focus:bg-white/10 transition
          "
          placeholder="Operating System Notes"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* UPLOADED BY */}
      <div>
        <label className="text-gray-300 text-sm ml-1">Uploaded By</label>
        <input
          type="text"
          className="
            w-full mt-2 px-4 py-3 bg-white/5 border border-gray-700 
            rounded-xl text-white placeholder-gray-500
            outline-none focus:border-blue-400 focus:bg-white/10 transition
          "
          placeholder="Your Name"
          value={uploadedBy}
          onChange={(e) => setUploadedBy(e.target.value)}
        />
      </div>

      {/* FILE INPUT */}
      <div>
        <label className="text-gray-300 text-sm ml-1">Choose PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="
            w-full mt-2 text-gray-300 p-3 rounded-xl 
            bg-white/5 border border-gray-700
            file:bg-white file:text-black file:px-4 file:py-2 file:rounded-lg
          "
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="
          w-full py-3 rounded-xl bg-white text-black font-semibold 
          hover:bg-blue-400 hover:text-white 
          transition hover:scale-[1.03] active:scale-95
        "
      >
        Upload PDF
      </button>

    </form>
  );
}

export default UploadPdf;
