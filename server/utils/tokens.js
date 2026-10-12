const crypto = require("crypto");

// Random token to put in an email link
function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

// We store only the hash in the database, never the token itself
function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

module.exports = { generateToken, hashToken };