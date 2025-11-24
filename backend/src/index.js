import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./db/Connectdb.js";

dotenv.config();

const app = express();

ConnectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Not able to connect DB:", error.message);
  });
