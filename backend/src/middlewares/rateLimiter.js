/**
 * Rate limiting middleware
 * Prevents abuse and ensures fair resource allocation
 */

const rateLimitStore = new Map();
const CLEANUP_INTERVAL = 60000; // Clean up every minute

// Cleanup old entries to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now - data.lastReset > 60000) {
      rateLimitStore.delete(key);
    }
  }
}, CLEANUP_INTERVAL);

export const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // limit each IP to 100 requests per windowMs
    message = "Too many requests, please try again later.",
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
  } = options;

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!rateLimitStore.has(key)) {
      rateLimitStore.set(key, {
        count: 1,
        lastReset: now,
        blocked: false,
      });
      return next();
    }

    const data = rateLimitStore.get(key);

    // Reset if window has passed
    if (now - data.lastReset > windowMs) {
      data.count = 1;
      data.lastReset = now;
      data.blocked = false;
      return next();
    }

    data.count++;

    // Set headers
    const remainingRequests = Math.max(0, max - data.count);
    res.setHeader("RateLimit-Limit", max);
    res.setHeader("RateLimit-Remaining", remainingRequests);
    res.setHeader("RateLimit-Reset", new Date(data.lastReset + windowMs).toISOString());

    if (data.count > max && !data.blocked) {
      data.blocked = true;
      console.warn(`⚠️  Rate limit exceeded for IP: ${key}`);
    }

    if (data.count > max) {
      return res.status(429).json({
        success: false,
        message,
        retryAfter: Math.ceil((data.lastReset + windowMs - now) / 1000),
        code: "RATE_LIMIT_EXCEEDED",
      });
    }

    next();
  };
};

/**
 * Specific rate limiter for signup endpoint
 * More strict to prevent registration spam
 */
export const signupLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 signups per hour per IP
  message: "Too many signup attempts. Please try again in an hour.",
});

/**
 * General API rate limiter
 */
export const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
});

/**
 * Strict rate limiter for login endpoint
 * Prevents brute force attacks
 */
export const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per 15 minutes
  message: "Too many login attempts. Please try again later.",
});
