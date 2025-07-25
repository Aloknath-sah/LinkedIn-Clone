import mongoose, { Connection } from "mongoose";

let isConnected: Connection | boolean = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("mongodb already connected");
    return isConnected;
  }

  try {
    
    const res = await mongoose.connect(process.env.MONGO_URI!, {
        dbName: process.env.MONGO_DB_NAME,
    });
    isConnected = res.connection;
    console.log("mongodb connected");
    return isConnected;

  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default connectDB
