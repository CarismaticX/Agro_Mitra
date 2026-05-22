import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

router.post("/advisory", async (req, res) => {
  try {
    const { prompt, language } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({
        text: "Prompt is required",
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        text: "GROQ API key missing",
      });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are an expert agricultural advisor.

Rules:
- Answer only agriculture related questions
- Help with crops
- Fertilizers
- Irrigation
- Diseases
- Weather impacts
- Soil health
- Pest control
- Organic farming

Give practical and concise advice.
Respond in ${language || "English"}.
`,
        },

        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.4,
      max_completion_tokens: 500,
    });

    const text =
      completion?.choices?.[0]?.message?.content ||
      "⚠️ No response generated";

    res.status(200).json({
      text,
    });

  } catch (error) {
    console.error("Groq error:", error);

    res.status(500).json({
      text: "⚠️ AI service unavailable",
    });
  }
});

export default router;