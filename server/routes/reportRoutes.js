const express = require("express");
const { getDashboardStats } = require("../controllers/reportController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getDashboardStats);

module.exports = router;
