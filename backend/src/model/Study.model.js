import mongoose from "mongoose";

const StudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: String,
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("StudyResource", StudySchema);
