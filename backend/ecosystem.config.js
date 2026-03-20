/**
 * PM2 Ecosystem Configuration
 * Enables clustering, load balancing, and auto-restart
 * 
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 start ecosystem.config.js --env production
 *   pm2 monit
 *   pm2 logs
 *   pm2 delete all
 */

module.exports = {
  apps: [
    {
      name: "unilink-backend",
      script: "./src/index.js",
      
      // ⚡ CLUSTERING FOR HORIZONTAL SCALING
      instances: "max", // Use all CPU cores (4 on quad-core = 4 instances)
      exec_mode: "cluster",
      
      // Environment variables
      env: {
        NODE_ENV: "development",
        PORT: 5002,
        BCRYPT_COST: 10,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5002,
        BCRYPT_COST: 12, // Higher cost for production
      },

      // ⚡ AUTO RESTART & MONITORING
      autorestart: true,
      watch: ["src"], // Watch for file changes
      ignore_watch: ["node_modules", "uploads", "logs"],
      max_memory_restart: "500M", // Restart if memory exceeds 500MB
      
      // ⚡ LOGGING
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",

      // ⚡ GRACEFUL SHUTDOWN
      kill_timeout: 5000,
      listen_timeout: 3000,
      wait_ready: true,
      
      // ⚡ MERGE LOGS
      merge_logs: true,
    },

    // ⚡ OPTIONAL: WORKER PROCESS FOR BACKGROUND JOBS
    // Uncomment when implementing job queues (Bull, etc.)
    // {
    //   name: "unilink-worker",
    //   script: "./src/worker.js",
    //   instances: 1,
    //   exec_mode: "fork",
    //   env: {
    //     NODE_ENV: "development",
    //   },
    //   env_production: {
    //     NODE_ENV: "production",
    //   },
    // },
  ],

  // ⚡ DEPLOY CONFIGURATION
  deploy: {
    production: {
      user: "node",
      host: "your-server.com",
      ref: "origin/main",
      repo: "git@github.com:yourname/unilink.git",
      path: "/var/www/unilink",
      "post-deploy": "npm install && pm2 reload ecosystem.config.js --env production",
    },
  },
};
