import router from "./routes/routes.js";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import compression from "compression";
import { errorHandler, requestLogger } from "./middlewares/errorHandler.js";
import { performanceMonitor, healthCheckWithMetrics } from "./middlewares/performanceMonitor.js";
import { cacheStatsMiddleware } from "./utils/cache.js";
import { logger } from "./utils/logger.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(requestLogger);


app.use(compression({
  level: 6,
  threshold: 1024, 
  type: ["application/json", "text/html", "text/plain", "text/css", "application/javascript"],
}));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));

app.use(performanceMonitor);

app.use(express.static(path.join(__dirname, "../public")));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://unilink-1.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cacheStatsMiddleware);

app.use("/api/user/v1", router);

app.get("/health", healthCheckWithMetrics);

app.get("/metrics", (req, res) => {
  const { getMetrics } = require("./middlewares/performanceMonitor.js");
  res.json(getMetrics());
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    code: "NOT_FOUND",
  });
});

app.use(errorHandler);

export default app;