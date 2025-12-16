import { useState } from "react";
import UpperNavbar from "../../../../components/UI/UpperNavbar";
import AllPdfs from "./AllPdfs";
import UploadPdf from "./UploadPdf";

function StudyResource() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <>
      <UpperNavbar />

      <div className="w-full min-h-[calc(100vh-80px)] bg-black px-6 py-10">
        <div className="max-w-6xl mx-auto">

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2 gap-2">

              <button
                onClick={() => setActiveTab("all")}
                className={`
                  px-6 py-2 rounded-lg text-sm font-medium
                  ${activeTab === "all"
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white hover:bg-white/10"}
                `}
              >
                All PDFs
              </button>

              <button
                onClick={() => setActiveTab("upload")}
                className={`
                  px-6 py-2 rounded-lg text-sm font-medium
                  ${activeTab === "upload"
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white hover:bg-white/10"}
                `}
              >
                Upload PDF
              </button>

            </div>
          </div>

          {/* CONTENT */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
            {activeTab === "all" ? <AllPdfs /> : <UploadPdf />}
          </div>

        </div>
      </div>
    </>
  );
}

export default StudyResource;
