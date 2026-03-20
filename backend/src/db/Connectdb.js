import mongoose from "mongoose";
import { DbName } from "../constant.js";

const ConnectDB = async () => {
  try {
    const instance = await mongoose.connect(process.env.MONGO_DB, {
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      retryReads: true,
      directConnection: false,
      heartbeatFrequencyMS: 10000,
    });
    
    console.log("Connected to:", instance.connection.name);
    
   
    mongoose.connection.on("disconnected", () => {
      console.warn("  MongoDB disconnected");
    });
    
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err.message);
    });
    
    return instance;
  } catch (error) {
    console.error("Error during DB connection:", error.message);
    // Retry after 3 seconds
    setTimeout(() => {
      ConnectDB();
    }, 3000);
  }
};

export default ConnectDB;