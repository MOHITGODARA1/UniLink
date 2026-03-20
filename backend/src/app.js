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

// ⚡ PERFORMANCE MIDDLEWARE CHAIN (in correct order)

// 1. Request logging middleware (must be first to capture all requests)
app.use(requestLogger);

// 2. Compression middleware (gzip all responses - 60-80% size reduction)
app.use(compression({
  level: 6, // Balance between compression and speed
  threshold: 1024, // Only compress responses > 1KB
  type: ["application/json", "text/html", "text/plain", "text/css", "application/javascript"],
}));

// 3. Body parsing middleware with size limits
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));

// 4. Performance monitoring (tracks response times)
app.use(performanceMonitor);

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "https://unilink-1.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ⚡ CACHE STATISTICS ENDPOINT
app.use(cacheStatsMiddleware);

// Routes
app.use("/api/user/v1", router);

// ⚡ ENHANCED HEALTH CHECK with metrics
app.get("/health", healthCheckWithMetrics);

// ⚡ METRICS ENDPOINT (for monitoring)
app.get("/metrics", (req, res) => {
  const { getMetrics } = require("./middlewares/performanceMonitor.js");
  res.json(getMetrics());
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    code: "NOT_FOUND",
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;