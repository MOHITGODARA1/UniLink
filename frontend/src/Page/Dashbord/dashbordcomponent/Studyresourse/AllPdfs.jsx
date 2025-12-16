import { useEffect, useState } from "react";
import axios from "axios";
import PdfCard from "./PdfCard";

function AllPdfs() {
  const [pdfs, setPdfs] = useState([]);
  const [search, setSearch] = useState("");

  const loadPDFs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/study/all`);
      setPdfs(response.data);
    } catch (error) {
      console.log("Error fetching PDFs:", error);
    }
  };

  useEffect(() => {
    loadPDFs();
  }, []);

  const filtered = pdfs.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Notes, PDFs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full px-5 py-3 mb-8 rounded-xl
          bg-white/5 border border-gray-700 
          text-gray-300 placeholder-gray-500
          outline-none focus:border-blue-400 focus:bg-white/10 transition
        "
      />

      {/* PDF GRID */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          No matching resources found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((pdf) => (
            <PdfCard key={pdf._id} pdf={pdf} />
          ))}
        </div>
      )}
    </>
  );
}

export default AllPdfs;
