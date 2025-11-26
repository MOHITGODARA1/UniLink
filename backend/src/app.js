import router from "./routes/routes.js";
import express from "express";
import cors from "cors";
const app=express();
app.use(express.json());

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));



app.use("/api/user/v1",router);

export default app