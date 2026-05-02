import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: (process.env.OPENAI_API_KEY || "").trim(),
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const GEMINI_KEY = (process.env.GEMINI_API_KEY || "").trim();


    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      // Try OpenAI first
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      });

      const reply = completion.choices[0].message.content;
      console.log("Response from OpenAI");
      return res.json({ reply });

    } catch (openaiError) {
      console.error("OpenAI Error:", openaiError.message);

      // Fallback to Gemini if OpenAI fails
      if (GEMINI_KEY) {
        console.log("Falling back to Gemini...");

        try {
          // Specialized medical system prompt moved from frontend for security and consistency
          const systemPrompt = `
You are CuraJit AI - healthcare assistant for Curajit platform.
ANALYZE symptoms → RECOMMEND exact specialist (Cardiologist, Dermatologist, etc.)
SUGGEST specific actions (immediate care, when to visit ER)
RECOMMEND available doctors when possible.
Format response clearly. Use a professional, empathetic, and actionable tone.
Always end with: "This is AI assistance only. Consult a doctor for diagnosis."

USER MESSAGE: ${message}
          `;

          const geminiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
            {
              contents: [{ parts: [{ text: systemPrompt }] }]
            }
          );

          const reply = geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (reply) {
            console.log("Response from Gemini (Fallback)");
            return res.json({ reply });
          }
        } catch (geminiError) {
          console.error("Gemini Error:", geminiError.response?.data || geminiError.message);
        }
      }

      // Final fallback: Mock Response (to keep the app "workable" during quota issues)
      console.log("All AI providers failed. Using mock response for demo purposes.");
      const mockResponses = [
        "I'm here to help! However, my AI brain is currently resting due to API quota limits. Please check your API keys or try again later.",
        "That's an interesting question. I'd normally give you a detailed medical insight, but I'm currently in 'offline mode' because the API limit was reached.",
        "Curajit AI is currently experiencing high demand. Please ensure your OpenAI/Gemini keys are active and have sufficient credits."
      ];
      const randomMock = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      return res.json({ 
        reply: randomMock + "\n\n(System Note: This is an automated fallback response because API quotas are exhausted.)" 
      });

    }

  } catch (error) {
    console.error("Final AI Error Trace:", error.response?.data || error);
    res.status(500).json({ 
      error: "AI failed to respond. Please check your API quotas.",
      details: error.response?.data?.error?.message || error.message
    });
  }
});


export default router;
