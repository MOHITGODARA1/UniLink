import mongoose from "mongoose";
import { DbName } from "../constant.js";
const ConnectDB=async ()=>{
  try {
    const instance=await mongoose.connect(`${process.env.MONGO_DB}/${DbName}`);
    console.log("Connected to:", instance.connection.name);
  } catch (error) {
    console.log("Error accured in DB connection",error.message);
  }
};

export default ConnectDB