import router from "./routes/routes.js";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://unilink-1.onrender.com"
  ],
  credentials:true
}));



app.use("/api/user/v1",router);

export default app