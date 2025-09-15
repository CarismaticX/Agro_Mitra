import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function fetchGeminiResponse(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("Sending prompt:", prompt); // 👈 debug

    const result = await model.generateContent(prompt);

    console.log("Full Gemini result:", result); // 👈 debug

    return result.response.text();
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "⚠️ Sorry, couldn't generate a response.";
  }
}
