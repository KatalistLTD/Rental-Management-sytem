import express from "express";
import {
  addProperty,
  deleteProperty,
  editProperty,
  getAllProperties,
} from "../controllers/propertyController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getAllProperties);
router.post("/", verifyToken, addProperty);
router.put("/:id", verifyToken, editProperty);
router.delete("/:id", verifyToken, deleteProperty);

export default router;
