import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; 

const connectMongoDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "CUSGRO", 
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectMongoDB;