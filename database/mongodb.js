import mongoose from "mongoose";

import { DB_NAME, DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.<development/production>.local"
  );
}

const connectToDB = async () => {
  try {
    await mongoose.connect(`${DB_URI}/${DB_NAME}`);
    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error(`Error connecting to db: ${error.message}`);
    process.exit(1);
  }
};

export { connectToDB };
