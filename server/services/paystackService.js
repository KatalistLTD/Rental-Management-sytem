const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

exports.initiatePaystackPayment = async (email, amount) => {
  const { data } = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    { email, amount: amount * 100, currency: "KES" },
    { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
  );

  return data;
};
