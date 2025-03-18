const express = require("express");
const { getProperties } = require("../controllers/landlordController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/properties", verifyToken, getProperties);

module.exports = router;
