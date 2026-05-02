import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_KEY = (process.env.GEMINI_API_KEY || "").trim();

async function listModels() {
    try {
        console.log("Listing Gemini Models...");
        const response = await axios.get(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_KEY}`
        );

        console.log("Available Models:", response.data.models.map(m => m.name));
    } catch (error) {
        console.error("Error listing models:", error.response?.data || error.message);
    }
}

listModels();
