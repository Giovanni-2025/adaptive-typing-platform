const rateLimit = require("express-rate-limit");

// 10 requests per 15 minutes per IP on sensitive routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts. Please try again later." },
});

module.exports = { authLimiter };