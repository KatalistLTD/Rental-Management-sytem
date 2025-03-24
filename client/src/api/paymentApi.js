import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

export const fetchPayments = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const payWithMpesa = async (phone, amount) => {
  const res = await axios.post(`${API_URL}/mpesa`, { phone, amount });
  return res.data;
};

export const payWithPaystack = async (email, amount) => {
  const res = await axios.post(`${API_URL}/paystack`, { email, amount });
  return res.data;
};
