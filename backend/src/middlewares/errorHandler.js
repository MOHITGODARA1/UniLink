/**
 * Centralized error handling middleware
 * Handles different types of errors consistently
 */

import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  logger.error("Request error occurred", {
    path: req.path,
    method: req.method,
    error: err.message,
    stack: err.stack,
  });

  // MongoDB duplicate key error (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
      field,
      code: "DUPLICATE_KEY",
    });
  }

  // MongoDB validation error
  if (err.name === "ValidationError") {
    const errors = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      code: "INVALID_TOKEN",
    });
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
    code: err.code || "INTERNAL_ERROR",
  });
};

/**
 * Request logging middleware
 * Logs incoming requests and their details
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Log the incoming request
  logger.info("Incoming request", {
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  // Override res.json to log response
  const originalJson = res.json.bind(res);
  res.json = function (data) {
    const duration = Date.now() - start;
    
    logger.info("Response sent", {
      path: req.path,
      method: req.method,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      success: data?.success,
    });

    return originalJson(data);
  };

  next();
};

/**
 * Async error wrapper to catch errors in async route handlers
 */
export const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
