import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import plantRoutes from "./routes/plant.js"; 
import aiRoutes from "./routes/ai.js"; 
import mandiRoutes from "./routes/mandi.js";
import weatherRoute from "./routes/weather.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/ai/plant", plantRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/mandi", mandiRoutes);
app.use("/api/weather", weatherRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
