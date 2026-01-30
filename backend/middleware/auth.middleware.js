const jwt = require("jsonwebtoken");

async function isAuth(req, res, next) {
  try {
    console.log("=== AUTH MIDDLEWARE ===");
    console.log("Cookies:", req.cookies);
    console.log("Headers:", req.headers);

    // Accept token from cookie (req.cookies.token) OR from Authorization header (Bearer <token>)
    let token = null;
    if (req.cookies && req.cookies.token) token = req.cookies.token;

    if (!token && req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
        token = parts[1];
      }
    }

    // fallback to x-access-token header
    if (!token && req.headers['x-access-token']) token = req.headers['x-access-token'];

    if (!token) {
      console.log("No token provided (cookies or headers)");
      return res.status(401).json({ message: "Login required" });
    }

    console.log("Token found:", token.substring(0, 20) + "...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded);

    // ensure req.user has an `id` property (controllers expect `req.user.id`)
    req.user = { id: decoded.id, role: decoded.role };
    console.log("User set:", req.user);

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = isAuth;
