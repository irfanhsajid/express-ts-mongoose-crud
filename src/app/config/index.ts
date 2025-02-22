// Import required modules
import path from "path";
import dotenv from "dotenv";
import process from "process";

// Load environment variables from a custom .env file
dotenv.config({ path: path.join(process.cwd(), ".env") });

// Example: Access an environment variable
// console.log(process.env.MONGODB_URI);

export default {
  port: process.env.PORT,
  mongodbUri: process.env.MONGODB_URI,
};
