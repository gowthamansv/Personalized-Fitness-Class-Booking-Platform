import mongoose from "mongoose";
import Grid from "gridfs-stream";
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Initialize GridFS
let gfs;
const initGFS = (conn) => {
  gfs = Grid(conn.connection.db, mongoose.mongo);
  gfs.collection("uploads");
};

export { connectDB, initGFS, gfs };
