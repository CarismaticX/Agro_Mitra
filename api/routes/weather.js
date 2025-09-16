import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// OpenWeather One Call API key
const OPENWEATHER_KEY = "cf8377b78f97c3a9cc8342d47148ae5c";

// /api/weather?lat=23.2599&lon=77.4126
router.get("/", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "Latitude and longitude are required" });

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_KEY}&exclude=minutely,hourly`;

    const response = await fetch(url);
    if (!response.ok) return res.status(500).json({ error: "Failed to fetch weather data" });

    const data = await response.json();
    res.json(data); // send full data: current, daily, alerts
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
