
class DuplicateKeyCache {
  constructor(ttl = 5 * 60 * 1000) {
    
    this.emails = new Map();
    this.usernames = new Map();
    this.ttl = ttl;
  }

  
  setEmail(email) {
    email = email.toLowerCase();
    this.emails.set(email, {
      timestamp: Date.now(),
      exists: true,
    });
  }

  
  hasEmail(email) {
    email = email.toLowerCase();
    if (!this.emails.has(email)) return null;

    const entry = this.emails.get(email);
    if (Date.now() - entry.timestamp > this.ttl) {
      this.emails.delete(email);
      return null;
    }

    return entry.exists;
  }

 
  setUsername(username) {
    username = username.toLowerCase();
    this.usernames.set(username, {
      timestamp: Date.now(),
      exists: true,
    });
  }

  hasUsername(username) {
    username = username.toLowerCase();
    if (!this.usernames.has(username)) return null;

    const entry = this.usernames.get(username);
    if (Date.now() - entry.timestamp > this.ttl) {
      this.usernames.delete(username);
      return null;
    }

    return entry.exists;
  }

 
  invalidate(email, username) {
    this.emails.delete(email.toLowerCase());
    this.usernames.delete(username.toLowerCase());
  }


  clear() {
    this.emails.clear();
    this.usernames.clear();
  }

  stats() {
    return {
      emailsCached: this.emails.size,
      usernamesCached: this.usernames.size,
      ttl: this.ttl,
    };
  }
}

export const duplicateKeyCache = new DuplicateKeyCache();


export const cacheStatsMiddleware = (req, res, next) => {
  if (req.path === "/cache-stats") {
    return res.json({
      duplicateKeyCache: duplicateKeyCache.stats(),
    });
  }
  next();
};
