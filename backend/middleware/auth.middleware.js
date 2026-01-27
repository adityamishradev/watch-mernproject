const jwt = require("jsonwebtoken");

async function isAuth(req, res, next) {
  try {
    console.log("=== AUTH MIDDLEWARE ===");
    console.log("Cookies:", req.cookies);
    console.log("Headers:", req.headers);
    
    const token = req.cookies.token;

    if (!token) {
      console.log("No token found in cookies");
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
