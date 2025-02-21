// Import required modules
const path = require("path");

const dotenv = require("dotenv");

// Load environment variables from a custom .env file
dotenv.config({ path: path.join(process.cwd(), ".env") });

// Example: Access an environment variable
console.log(process.env.MONGODB_URI);
console.log(process.env.PORT);
