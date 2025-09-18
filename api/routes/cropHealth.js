// Assuming TypeScript + express
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/identify', async (req, res) => {
  try {
    const { images } = req.body; // array of base64 image strings
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: "No images provided" });
    }
    const apiKey = process.env.CROP_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    // Call crop.health
    const response = await axios.post(
      'https://crop.kindwise.com/api/v1/identification?details=taxonomy,wiki_url',
      { images },
      {
        headers: {
          'Api-Key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    // You can process response.data before returning if needed
    return res.json(response.data);

  } catch (err) {
    console.error("crop.health identify error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to identify disease/crop", info: err.response?.data || err.message });
  }
});

export default router;