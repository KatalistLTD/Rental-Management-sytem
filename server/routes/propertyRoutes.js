const express = require("express")
const {
  addProperty,
  deleteProperty,
  editProperty,
  getAllProperties,
} = require("../controllers/propertyController.js")
const { verifyToken } =require("../middleware/authMiddleware")

const router = express.Router();

router.get("/", verifyToken, getAllProperties);
router.post("/", verifyToken, addProperty);
router.put("/:id", verifyToken, editProperty);
router.delete("/:id", verifyToken, deleteProperty);

module.exports = router;
