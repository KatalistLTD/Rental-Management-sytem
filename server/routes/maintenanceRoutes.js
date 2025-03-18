const express = require("express");
const {
  createRequest,
  getRequests,
  updateRequest,
} = require("../controllers/maintenanceController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createRequest);
router.get("/", verifyToken, getRequests);
router.put("/", verifyToken, updateRequest);

module.exports = router;
