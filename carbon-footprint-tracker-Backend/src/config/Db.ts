import mongoose from "mongoose";
const connectDB=async():Promise<void>=>{
  try {
    const mongoUrl=process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined in .env file");
    }
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected");
  } catch (error:unknown) {
    if (error instanceof Error) {
      console.error("MongoDB connection failed:",error.message);
    } else {
      console.error("MongoDB connection failed");
    }
    process.exit(1);
  }
};
export default connectDB;