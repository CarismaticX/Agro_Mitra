import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import plantRoutes from "./routes/plant.js"; 
import aiRoutes from "./routes/ai.js"; 
import mandiRoutes from "./routes/mandi.js";
import weatherRoute from "./routes/weather.js";
import cropHealthRouter from "./routes/cropHealth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/ai/plant", plantRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/mandi", mandiRoutes);
app.use("/api/weather", weatherRoute);
app.use("/api/cropHealth", cropHealthRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
