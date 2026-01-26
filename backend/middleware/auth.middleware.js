const jwt = require("jsonwebtoken");

async function isAuth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Login required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ensure req.user has an `id` property (controllers expect `req.user.id`)
    req.user = { id: decoded.id };

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = isAuth;
