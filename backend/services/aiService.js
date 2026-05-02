import axios from "axios";

export const getAIResponse = async (message) => {
  const API_KEY = process.env.GEMINI_API_KEY;

  const systemPrompt = `
You are CuraJit AI - advanced healthcare assistant.

RULES:
- Analyze symptoms
- Suggest specialist
- Detect emergency
- Give clear next steps

User: ${message}
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      contents: [{ parts: [{ text: systemPrompt }] }]
    }
  );

  return response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
};