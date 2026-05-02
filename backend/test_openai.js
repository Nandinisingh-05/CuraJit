import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [{ role: "user", content: "Say hi" }],
    });
    console.log("Success:", completion.choices[0].message.content);
  } catch (error) {
    console.error("Error Status:", error.status);
    console.error("Error Message:", error.message);
    if (error.response) {
        console.error("Error Data:", error.response.data);
    }
  }
}

test();
