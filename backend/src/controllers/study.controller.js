import StudyModel from "../model/Study.model.js";
import cloudinary from "../utils/cloudnary.js";


export const uploadPdf = async (req, res) => {
  try {
    const { title, uploadedBy } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

  
    const pdfUpload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "unilink_pdfs",
    });

    const newPdf = new StudyModel({
      title,
      uploadedBy,
      pdfUrl: pdfUpload.secure_url,
    });

    await newPdf.save();

    res.status(201).json({
      message: "PDF uploaded successfully",
      data: newPdf,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};


export const getAllPdfs = async (req, res) => {
  try {
    const pdfs = await StudyModel.find().sort({ uploadedAt: -1 });
    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch PDFs" });
  }
};


export const getPdf = async (req, res) => {
  try {
    const pdf = await StudyModel.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    res.status(200).json(pdf);
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch resource" });
  }
};


export const deletePdf = async (req, res) => {
  try {
    const pdf = await StudyModel.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    await pdf.deleteOne();

    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Cannot delete resource" });
  }
};
