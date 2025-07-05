import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected ${connection.connection.host}`);
  } catch (err) {
    console.log("DB connection error", err);
    process.exit(1); //1 is failure, 0 is success
  }
};
