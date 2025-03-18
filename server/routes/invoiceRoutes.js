import express from "express";
import {
  createNewInvoice,
  getAllInvoices,
} from "../controllers/invoiceController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createNewInvoice);
router.get("/", verifyToken, getAllInvoices);

export default router;
