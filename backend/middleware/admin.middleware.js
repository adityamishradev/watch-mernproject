const User = require("../models/user.model");

async function isAdmin(req, res, next) {
  // req.user may be an object { id } (auth middleware sets it that way)
  const userId = req.user && (req.user.id || req.user);
  
  const user = await User.findById(userId);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin only access" });
  }

  next();
}

module.exports = isAdmin;
