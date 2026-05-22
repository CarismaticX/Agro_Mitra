import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// GET:
// /api/weather?city=Jabalpur
// OR
// /api/weather?lat=23.2599&lon=77.4126

router.get("/", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "OPENWEATHER_API_KEY missing in .env",
      });
    }

    let currentUrl;
    let forecastUrl;

    // City search
    if (city) {
      currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    }

    // Coordinates search
    else if (lat && lon) {
      currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    }

    else {
      return res.status(400).json({
        error: "Provide city OR lat/lon",
      });
    }

    const currentRes = await fetch(currentUrl);
    const currentData = await currentRes.json();

    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    if (currentData.cod != 200) {
      return res.status(400).json({
        error: currentData.message,
      });
    }

    res.json({
      current: currentData,
      forecast: forecastData,
    });

  } catch (err) {
    console.error("Weather error:", err);

    res.status(500).json({
      error: "Weather fetch failed",
    });
  }
});

export default router;