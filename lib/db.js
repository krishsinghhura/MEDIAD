import mongoose from "mongoose";

const url = process.env.MONGO_URI;

if (!url) {
  throw new Error("MongoDB URL is missing!");
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("✅ MongoDB is already connected");
      return;
    }

    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error(`Database connection failed!: ${error.message}`);
  }
};
