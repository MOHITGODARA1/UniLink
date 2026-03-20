

const log = (level, message, data = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...data,
  };

  if (level === "ERROR") {
    console.error(`[${timestamp}] ❌ ${message}`, data);
  } else if (level === "WARN") {
    console.warn(`[${timestamp}] ⚠️  ${message}`, data);
  } else if (level === "INFO") {
    console.log(`[${timestamp}] ℹ️  ${message}`, data);
  } else {
    console.log(`[${timestamp}] 📝 ${message}`, data);
  }
};

export const logger = {
  error: (message, data) => log("ERROR", message, data),
  warn: (message, data) => log("WARN", message, data),
  info: (message, data) => log("INFO", message, data),
  debug: (message, data) => log("DEBUG", message, data),
};
