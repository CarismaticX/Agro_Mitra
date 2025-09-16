import express from "express";
import fetch from "node-fetch"; // if using Node <18, otherwise skip

const router = express.Router();

// GET /api/mandi
router.get("/", async (req, res) => {
  const { state, district, commodity, limit = 10, offset = 0 } = req.query;

  try {
    const url = new URL("https://data.gov.in/api/resource/35985678-0d79-46b4-9ed6-6f13308a1d24");
    url.searchParams.append("api-key", "579b464db66ec23bdd00000129afbab73b0a45585a3d2bd314284ae1");
    url.searchParams.append("format", "json");
    url.searchParams.append("offset", offset);
    url.searchParams.append("limit", limit);
    if (state) url.searchParams.append("filters[State]", state);
    if (district) url.searchParams.append("filters[District]", district);
    if (commodity) url.searchParams.append("filters[Commodity]", commodity);

    const response = await fetch(url.toString());
    const data = await response.json();

    let prices = [];
    if (data.records && data.records.length > 0) {
      prices = data.records.map((r) => ({
        crop: r.Commodity,
        variety: r.Variety || "Standard",
        currentPrice: Number(r.Price_Unit) || Number(r["Modal_Price"]) || 0,
        previousPrice: Number(r.Price_Unit) || Number(r["Modal_Price"]) || 0, // placeholder
        unit: r.Unit || "quintal",
        market: `${r.Market} - ${r.District}`,
        lastUpdated: r.Arrival_Date,
        trend: "up", // optional: you can calculate trend by comparing previousPrice if available
      }));
    }

    // Fallback sample data if API returns empty
    if (prices.length === 0) {
      prices = [
        { crop: "Rice", variety: "Basmati 1121", currentPrice: 4500, previousPrice: 4200, unit: "quintal", market: "Delhi Mandi", lastUpdated: "Today", trend: "up" },
        { crop: "Wheat", variety: "HD-2967", currentPrice: 2800, previousPrice: 2850, unit: "quintal", market: "Punjab Mandi", lastUpdated: "Today", trend: "down" },
      ];
    }

    res.json(prices);
  } catch (err) {
    console.error("Mandi API error:", err);
    res.status(500).json({ error: "Failed to fetch mandi prices" });
  }
});

export default router;
