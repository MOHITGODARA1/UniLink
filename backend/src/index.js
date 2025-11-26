
import dotenv from "dotenv";
import ConnectDB from "./db/Connectdb.js";
import app from "./app.js";

dotenv.config();

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
