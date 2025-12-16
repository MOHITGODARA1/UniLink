function PdfCard({ pdf }) {

  const downloadPDF = async () => {
    try {
      // Fetch the PDF as a blob
      const response = await fetch(pdf.pdfUrl);
      const blob = await response.blob();
      
      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${pdf.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download PDF. Please try again.");
    }
  };

  const viewPDF = async () => {
    try {
      const response = await fetch(pdf.pdfUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Open blob URL in new tab for viewing
      const newWindow = window.open(blobUrl, '_blank');
      
      // Cleanup after window loads
      if (newWindow) {
        newWindow.onload = () => {
          setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
        };
      }
    } catch (error) {
      console.error("View failed:", error);
      // Fallback to direct URL
      window.open(pdf.pdfUrl, '_blank');
    }
  };

  return (
    <div className="
      bg-white/10 backdrop-blur-xl 
      border border-white/20 
      rounded-2xl p-6 shadow-lg hover:bg-white/20 transition
    ">
      <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{pdf.title}</h3>

      <p className="text-gray-300 text-sm mb-4">
        Uploaded By: <span className="text-blue-400">{pdf.uploadedBy}</span>
      </p>

      <div className="flex gap-3">

        {/* View PDF */}
        {/* <button
          onClick={viewPDF}
          className="
            px-4 py-2 bg-white/5 border border-gray-700 rounded-xl 
            text-gray-200 hover:bg-white/10 transition
          "
        >
          View
        </button> */}

        {/* Download PDF */}
        <button
          onClick={downloadPDF}
          className="
            px-4 py-2 bg-white text-black rounded-xl 
            hover:bg-blue-400 hover:text-white 
            transition hover:scale-[1.03] active:scale-95
          "
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default PdfCard;