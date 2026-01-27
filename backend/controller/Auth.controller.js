const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ================== HELPER: GENERATE TOKEN ================== */
function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/* ================= REGISTER (USER ONLY) ================= */
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role: "user", // default user
    });

    user.password = undefined;

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= USER LOGIN ================= */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.role !== "user") {
      return res.status(403).json({ message: "Use admin login" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", // Changed from "strict" to "lax" for cross-origin
      secure: false, // Set to false for localhost development
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.password = undefined;

    res.json({
      message: "Login successful",
        token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= ADMIN LOGIN ================= */
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    let admin = await User.findOne({ email }).select("+password");

    // create admin if not exists
    if (!admin) {
      const hash = await bcrypt.hash(password, 10);
      admin = await User.create({
        name: "Admin",
        email,
        password: hash,
        role: "admin",
      });
    }

    const token = generateToken(admin);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", // Changed from "strict" to "lax" for cross-origin
      secure: false, // Set to false for localhost development
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    admin.password = undefined;

    res.json({
      message: "Admin login successful",
        token,
      user: admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= LOGOUT ================= */
async function logout(req, res) {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
}

module.exports = {
  register,
  login,
  adminLogin,
  logout,
};
