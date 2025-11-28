import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState } from "react";

function StudyResourse() {
  const [resources, setResources] = useState([
    {
      id: 1,
      name: "DSA Notes.pdf",
      size: "520 KB",
      type: "application/pdf",
      file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 2,
      name: "Java Cheat Sheet.pdf",
      size: "340 KB",
      type: "application/pdf",
      file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 3,
      name: "Operating System Notes.docx",
      size: "1.2 MB",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      file: "https://file-examples.com/storage/fe6b5c9da6e2d2c8410e45c/2017/02/file-sample_100kB.docx",
    },
    {
      id: 4,
      name: "Last Year Question Paper.pdf",
      size: "780 KB",
      type: "application/pdf",
      file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newResource = {
      id: Date.now(),
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      type: file.type,
      file: URL.createObjectURL(file),
    };

    setResources([newResource, ...resources]);
  };

  return (
    <>
      <UpperNavbar />

      <div className="w-full min-h-screen bg-black px-6 py-10">
        <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <h1 className="text-3xl font-bold text-white mb-2">Study Resources</h1>
          <p className="text-gray-400 mb-8">
            Upload your study materials or explore the shared resources.
          </p>

          {/* UPLOAD SECTION */}
          <div className="bg-white/5 backdrop-blur-xl p-6 rounded-xl shadow border border-gray-700 mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">Upload a Resource</h2>

            <label className="block w-full">
              <div className="
                w-full cursor-pointer flex flex-col items-center justify-center 
                border border-dashed border-gray-500 py-8 rounded-xl 
                hover:border-blue-500 hover:bg-white/10 transition
              ">
                <i className="ri-upload-cloud-2-line text-4xl text-gray-300 mb-2"></i>
                <span className="text-gray-400">Click to upload study files</span>
              </div>

              <input 
                type="file"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
          </div>

          {/* RESOURCE LIST */}
          <div className="bg-white/5 backdrop-blur-xl p-6 rounded-xl shadow border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Available Resources</h2>

            {resources.length === 0 && (
              <p className="text-gray-500">No resources uploaded yet.</p>
            )}

            <ul className="space-y-4">
              {resources.map((res) => (
                <li 
                  key={res.id}
                  className="
                    flex items-center justify-between p-4 border border-gray-700 rounded-xl 
                    hover:bg-white/10 transition
                  "
                >
                  <div>
                    <p className="font-semibold text-white">{res.name}</p>
                    <p className="text-sm text-gray-400">
                      {res.type} • {res.size}
                    </p>
                  </div>

                  {/* Action Icons */}
                  <div className="flex items-center gap-4">

                    {/* View */}
                    <a
                      href={res.file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      <i className="ri-eye-line text-xl"></i>
                    </a>

                    {/* Download */}
                    <a
                      href={res.file}
                      download={res.name}
                      className="text-green-400 hover:text-green-300 transition"
                    >
                      <i className="ri-download-2-line text-xl"></i>
                    </a>

                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}

export default StudyResourse;
