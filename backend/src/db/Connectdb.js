import mongoose from "mongoose";
import { DbName } from "../constant.js";

const ConnectDB = async () => {
  try {
    const instance = await mongoose.connect(process.env.MONGO_DB, {
      // Connection pooling for handling concurrent requests
      maxPoolSize: 10,
      minPoolSize: 5,
      
      // Timeout configurations
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      
      // Retry logic for transient failures
      retryWrites: true,
      retryReads: true,
      
      // Performance optimizations
      directConnection: false,
      
      // Heartbeat for connection monitoring
      heartbeatFrequencyMS: 10000,
    });
    
    console.log("Connected to:", instance.connection.name);
    
    // Monitor connection events for debugging
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected");
    });
    
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });
    
    return instance;
  } catch (error) {
    console.error("❌ Error during DB connection:", error.message);
    // Retry after 3 seconds
    setTimeout(() => {
      ConnectDB();
    }, 3000);
  }
};

export default ConnectDB;