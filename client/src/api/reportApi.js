import axios from "axios";

const API_URL = "http://localhost:5000/api/reports";

export const fetchReports = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
