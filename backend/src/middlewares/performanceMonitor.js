/**
 * Performance monitoring middleware
 * Tracks response times, throughput, and identifies bottlenecks
 */

import { performance } from "perf_hooks";

const metrics = {
  startTime: Date.now(),
  requests: 0,
  totalDuration: 0,
  slowRequests: [],
  statusCodes: {},
  endpointMetrics: {},
};

export const performanceMonitor = (req, res, next) => {
  const startTime = performance.now();
  const startMemory = process.memoryUsage();

  // Override res.json to capture metrics
  const originalJson = res.json.bind(res);
  res.json = function (data) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    const endpoint = `${req.method} ${req.path}`;

    // Update metrics
    metrics.requests++;
    metrics.totalDuration += duration;

    const statusCode = res.statusCode;
    metrics.statusCodes[statusCode] = (metrics.statusCodes[statusCode] || 0) + 1;

    if (!metrics.endpointMetrics[endpoint]) {
      metrics.endpointMetrics[endpoint] = {
        count: 0,
        totalTime: 0,
        avgTime: 0,
        maxTime: 0,
      };
    }

    metrics.endpointMetrics[endpoint].count++;
    metrics.endpointMetrics[endpoint].totalTime += duration;
    metrics.endpointMetrics[endpoint].avgTime =
      metrics.endpointMetrics[endpoint].totalTime /
      metrics.endpointMetrics[endpoint].count;
    metrics.endpointMetrics[endpoint].maxTime = Math.max(
      metrics.endpointMetrics[endpoint].maxTime,
      duration
    );

    // Track slow requests (>500ms)
    if (duration > 500) {
      metrics.slowRequests.push({
        endpoint,
        duration: duration.toFixed(2),
        timestamp: new Date().toISOString(),
        statusCode,
      });

      // Keep only last 100 slow requests
      if (metrics.slowRequests.length > 100) {
        metrics.slowRequests.shift();
      }
    }

    // Log slow requests
    if (duration > 500) {
      console.warn(
        `🐢 SLOW REQUEST: ${endpoint} took ${duration.toFixed(2)}ms (${statusCode})`
      );
    }

    return originalJson(data);
  };

  next();
};

/**
 * Get current performance metrics
 * Useful for monitoring and debugging
 */
export const getMetrics = () => {
  const uptime = (Date.now() - metrics.startTime) / 1000;
  const avgResponseTime = (metrics.totalDuration / metrics.requests).toFixed(2);
  const throughput = (metrics.requests / uptime).toFixed(2);

  return {
    uptime: `${uptime.toFixed(1)}s`,
    totalRequests: metrics.requests,
    avgResponseTime: `${avgResponseTime}ms`,
    throughput: `${throughput} req/s`,
    statusCodes: metrics.statusCodes,
    slowRequests: metrics.slowRequests,
    endpoints: Object.entries(metrics.endpointMetrics).map(([endpoint, stats]) => ({
      endpoint,
      count: stats.count,
      avgTime: stats.avgTime.toFixed(2),
      maxTime: stats.maxTime.toFixed(2),
    })),
  };
};

/**
 * Health check with metrics
 */
export const healthCheckWithMetrics = (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`,
      heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)}MB`,
      rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)}MB`,
    },
    metrics: getMetrics(),
  });
};
