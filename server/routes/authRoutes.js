const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { login } = require("../controllers/authController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Allowed roles for signup
const ALLOWED_ROLES = ["Landlord", "Tenant"];

// Rate limiting middleware (prevent brute-force attacks on login)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { message: "Too many login attempts, please try again later" },
});

// ✅ Login route with rate limiting
router.post("/login", loginLimiter, login);

// ✅ Signup route with validation
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role").isIn(ALLOWED_ROLES).withMessage("Invalid role selected"),
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, role } = req.body;

      const existingUser = await User.findOne({
        where: { email: req.body.email },
      });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash password with 12 salt rounds
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });

      // Save user to database
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Set token in an HTTP-only cookie (prevents XSS attacks)
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(201).json({
        message: "User registered successfully!",
      });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Server error, please try again later" });
    }
  }
);

// ✅ Logout route
router.post("/logout", verifyToken, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// ✅ Role-based protected routes
router.get("/tenants", verifyToken, authorizeRoles("Landlord"), (req, res) => {
  res.json({ message: "Access granted to tenants list!" });
});

router.get("/landlords", verifyToken, authorizeRoles("Admin"), (req, res) => {
  res.json({ message: "Access granted to landlords only!" });
});

module.exports = router;
