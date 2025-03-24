import axios from "axios";

const API_URL = "http://localhost:5000/api/properties"; // Ensure this is correct

export const fetchProperties = async (token) => {
  try {
    if (!token) {
      console.error("❌ No token provided. Fetch request will fail.");
      return [];
    }

    console.log("✅ Sending token to backend:", token); // Debugging

    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }, // Include token
    });

    return res.data;
  } catch (error) {
    console.error("❌ Error fetching properties:", error.response?.data || error.message);
    return [];
  }
};

export const addProperty = async (property, token) => {
  try {
    const res = await axios.post(API_URL, property, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding property:", error.response?.data || error.message);
    return null; // Return null on failure
  }
};

export const updateProperty = async (id, property, token) => {
  try {
    await axios.put(`${API_URL}/${id}`, property, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error updating property:", error.response?.data || error.message);
  }
};

export const deleteProperty = async (id, token) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting property:", error.response?.data || error.message);
  }
};
