const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user"); // Ensure this is the correct path
require("dotenv").config();

// ✅ Token Verification Middleware
exports.verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  console.log("✅ Received Authorization Header:", authHeader); // Debugging

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Access denied. No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("✅ Extracted Token:", token); // Debugging

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded); // 🔥 Check if `userId` exists

    if (!decoded.userId) {
      console.error("❌ Error: `userId` missing from token payload.");
      return res.status(400).json({ message: "Invalid token: userId missing." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Token Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

// ✅ Role-Based Access Control Middleware
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};

// ✅ Get Authenticated User (Optional: API to Fetch User Details)
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }, // Don't return the password
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user data" });
  }
};
