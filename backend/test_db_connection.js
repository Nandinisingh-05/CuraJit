import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });


const testConnection = async () => {
  console.log("Attempting to connect to:", process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ SUCCESS: Connected to MongoDB!");
    process.exit(0);
  } catch (err) {
    console.error("❌ FAILURE: Connection Error:");
    console.error("Message:", err.message);
    if (err.message.includes("querySrv ECONNREFUSED")) {
       console.log("\n💡 Possible causes:");
       console.log("1. DNS issues (common with +srv strings). Try the 'Standard' connection string from Atlas.");
       console.log("2. IP whitelist issue in MongoDB Atlas.");
       console.log("3. Firewall blocking port 27017 or 27015.");
    }
    process.exit(1);
  }
};

testConnection();
