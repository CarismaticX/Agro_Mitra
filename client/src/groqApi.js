export async function fetchAIResponse(prompt, language = "English") {
  try {
    const res = await fetch("http://localhost:5000/api/ai/advisory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, language }),
    });

    const data = await res.json();
    return data.text || "⚠️ No response from AI";
  } catch (err) {
    console.error("Frontend AI error:", err);
    return "⚠️ Failed to contact AI service.";
  }
}
