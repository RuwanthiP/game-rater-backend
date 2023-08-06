import mongoose from "mongoose";
import { MONGO_URI } from "../lib/const";

let conn = null;

const connectDatabase = async () => {
  if (conn == null) {
    conn = await mongoose
      .connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
      .then(console.log("DB Connected Successfully"));
    return conn;
  }
  console.log(
    "Connection already established, reusing the existing connection"
  );
};

export default connectDatabase;
