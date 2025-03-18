const axios = require("axios");
const dotenv = require("dotenv");
const moment = require("moment");

dotenv.config();

const mpesaAuth = async () => {
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const { data } = await axios.get(url, {
    headers: { Authorization: `Basic ${auth}` },
  });
  return data.access_token;
};

exports.initiateSTKPush = async (phone, amount) => {
  const token = await mpesaAuth();
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  const requestData = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: "Rental Payment",
    TransactionDesc: "Rent Payment",
  };

  const { data } = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    requestData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return data;
};
