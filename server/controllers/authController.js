const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

/**
 * @desc Login User
 * @route POST /api/auth/login
 */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔍 Login attempt with email:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Fetch user from DB
    const user = await User.findOne({ where: { email } });
    console.log("🔍 User found:", user ? user.userId : "No user found");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn("❌ Invalid password for user ID:", user.userId);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ User authenticated:", user.userId);

    // ✅ Generate JWT with `userId`
    const token = jwt.sign(
      { userId: user.userId, role: user.role }, // 🔥 Replaced `id` with `userId`
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );

    // Set cookie & send response
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user.userId, // 🔥 Ensure frontend receives `userId`
    });
  } catch (error) {
    console.error("🛑 Unexpected Login Error:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

/**
 * @desc Signup User
 * @route POST /api/auth/signup
 */
exports.signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "User registered successfully!", token });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
