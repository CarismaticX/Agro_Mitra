import express from "express";
const router = express.Router();

// POST /api/ai/gemini
router.post("/gemini", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ text: "Prompt is required" });
  }

  try {
    // Node 18+ has fetch globally
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Could not generate response.";

    res.json({ text });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.json({ text: "⚠️ Could not generate response." });
  }
});

export default router;
