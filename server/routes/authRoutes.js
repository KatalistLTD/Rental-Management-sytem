const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { loginUser, signupUser } = require("../controllers/authController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { message: "Too many login attempts, please try again later" },
});

// ✅ Login (POST /api/auth/login)
router.post("/auth/login", loginLimiter, loginUser);

// ✅ Signup (POST /api/auth/signup)
router.post(
  "/auth/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role")
      .isIn(["Landlord", "Tenant"])
      .withMessage("Invalid role selected"),
  ],
  signupUser
);

// ✅ Logout (POST /api/auth/logout)
router.post("/auth/logout", verifyToken, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// ✅ Get all Tenants (GET /api/auth/tenants) - Only accessible to Landlords
router.get(
  "/auth/tenants",
  verifyToken,
  authorizeRoles("Landlord"),
  (req, res) => {
    res.json({ message: "Access granted to tenants list!" });
  }
);

// ✅ Get all Landlords (GET /api/auth/landlords) - Only accessible to Admin
router.get(
  "/auth/landlords",
  verifyToken,
  authorizeRoles("Admin"),
  (req, res) => {
    res.json({ message: "Access granted to landlords only!" });
  }
);

// ✅ Get User Profile (Protected Route)
router.get("/auth/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
