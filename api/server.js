import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import aiRoutes from "./routes/ai.js";
import weatherRoutes from "./routes/weather.js";

// Resolve current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({
  path: path.join(__dirname, ".env"),
});

console.log(
  "GROQ API:",
  process.env.GROQ_API_KEY
    ? "Loaded ✅"
    : "Missing ❌"
);

console.log(
  "WEATHER API:",
  process.env.OPENWEATHER_API_KEY
    ? "Loaded ✅"
    : "Missing ❌"
);

const app = express();

// Middleware
app.use(cors());

app.use(
  express.json()
);

// Routes
app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/weather",
  weatherRoutes
);

// Health route
app.get(
  "/",
  (req, res) => {
    res.json({
      status:
        "Server running",

      groq: Boolean(
        process.env
          .GROQ_API_KEY
      ),

      weather:
        Boolean(
          process.env
            .OPENWEATHER_API_KEY
        ),
    });
  }
);

// Start server
const PORT =
  process.env.PORT ||
  5000;

app.listen(
  PORT,
  () => {
    console.log(
      `🚀 Server running on port ${PORT}`
    );
  }
);