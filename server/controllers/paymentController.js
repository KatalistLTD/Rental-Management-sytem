const Payment = require("../models/payment");
const { initiateSTKPush } = require("../services/mpesaServices");
const { initiatePaystackPayment } = require("../services/paystackService");

exports.addPayment = async (req, res) => {
  const { tenantId, propertyId, amount, paymentMethod, transactionId, status } =
    req.body;
  const landlordId = req.user.landlordId;

  try {
    const paymentId = await Payment.createPayment(
      tenantId,
      landlordId,
      propertyId,
      amount,
      paymentMethod,
      transactionId,
      status
    );
    res
      .status(201)
      .json({ id: paymentId, message: "Payment recorded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to record payment" });
  }
};

exports.getAllPayments = async (req, res) => {
  const landlordId = req.user.landlordId;
  const payments = await Payment.getPayments(landlordId);
  res.json(payments);
};

exports.makeMpesaPayment = async (req, res) => {
  try {
    const { phone, amount } = req.body;
    const response = await initiateSTKPush(phone, amount);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "M-Pesa payment failed" });
  }
};

exports.makePaystackPayment = async (req, res) => {
  try {
    const { email, amount } = req.body;
    const response = await initiatePaystackPayment(email, amount);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Paystack payment failed" });
  }
};
