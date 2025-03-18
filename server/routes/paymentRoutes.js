const express = require("express");
const {
  addPayment,
  getAllPayments,
  makeMpesaPayment,
  makePaystackPayment,
} = require("../controllers/paymentController.js");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, addPayment);
router.get("/", verifyToken, getAllPayments);
router.post("/mpesa", makeMpesaPayment);
router.post("/paystack", makePaystackPayment);

module.exports = router;
