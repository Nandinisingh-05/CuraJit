import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_KEY = (process.env.GEMINI_API_KEY || "").trim();

async function testGemini() {
    try {
        console.log("Testing Gemini API...");
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
            {
                contents: [{ parts: [{ text: "Hello, are you working?" }] }]
            }
        );

        console.log("Gemini Response:", response.data?.candidates?.[0]?.content?.parts?.[0]?.text);
    } catch (error) {
        console.error("Gemini Error:", error.response?.data || error.message);
    }
}

testGemini();
