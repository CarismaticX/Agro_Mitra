import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  let { base64Image } = req.body;

  if (!base64Image) {
    return res.status(400).json({ error: "Image is required" });
  }

  // remove base64 header if present
  base64Image = base64Image.replace(/^data:image\/\w+;base64,/, "");

  try {
    const response = await fetch("https://plant.id/api/v3/identification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": process.env.PLANT_ID_API_KEY,
      },
      body: JSON.stringify({
        images: [base64Image],
        health: "all",
      }),
    });

    const rawBody = await response.text();
    let data;
    try {
      data = JSON.parse(rawBody);
    } catch {
      data = null;
    }

    if (!response.ok) {
      // If the response is not OK, try to parse JSON, but fall back to text
      let errorData;
      try {
        errorData = JSON.parse(rawBody);
        console.error(
          `Plant.id API Error: HTTP Status ${response.status}`,
          errorData
        );
        return res
          .status(response.status)
          .json({
            error:
              errorData.error ||
              "Failed to analyze image. Please try again later.",
          });
      } catch (jsonError) {
        console.error(
          `Plant.id API Error: HTTP Status ${response.status}, Non-JSON response: ${rawBody}`
        );
        return res
          .status(response.status)
          .json({ error: `API returned a non-JSON error: ${rawBody}` });
      }
    }

    // Check if the API request was rejected for other reasons
    if (data?.error) {
      console.error("Plant.id API Error:", data.error);
      return res.status(400).json({ error: data.error });
    }

    if (!data?.result?.is_plant?.binary) {
      return res.json({
        result: null,
        message:
          "No plant detected in the image. Please upload a clear photo of a plant.",
      });
    }

    const disease = data.result.disease?.suggestions?.[0];

    if (!disease) {
      return res.json({
        result: null,
        message:
          "No diseases or pests were detected. Your plant appears to be healthy!",
      });
    }

    const result = {
      pest: disease.name,
      confidence: Math.round(disease.probability * 100),
      severity:
        disease.probability > 0.7
          ? "High"
          : disease.probability > 0.4
          ? "Moderate"
          : "Low",
      description: disease.description || "No description available",
      treatment: [
        ...(disease.treatment?.chemical || []),
        ...(disease.treatment?.biological || []),
      ],
      prevention: disease.treatment?.prevention || [],
    };

    res.json({ result, message: "Pest or disease detected." });
  } catch (err) {
    console.error("Server-side error:", err);
    res
      .status(500)
      .json({
        error: "An internal server error occurred. Please try again later.",
      });
  }
});

export default router;
