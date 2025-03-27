import axios from "axios";

const API_URL = "http://localhost:5000/api/tenants";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Function to attach the token to headers
const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Fetch all tenants
export const fetchTenants = async (token) => {
  try {
    if (!token) throw new Error("No authentication token provided");
    
    const response = await fetch("http://localhost:5000/api/tenants/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure correct format
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch tenants");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tenants:", error);
    throw error;
  }
};


// Add a new tenant
export const addTenant = async (tenant, token) => {
  try {
    const res = await apiClient.post("/", tenant, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    console.error(
      "Error adding tenant:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to add tenant");
  }
};

// Update tenant details
export const updateTenant = async (id, tenant, token) => {
  try {
    const res = await apiClient.put(`/${id}`, tenant, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    console.error(
      "Error updating tenant:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to update tenant");
  }
};

// Delete a tenant
export const deleteTenant = async (id, token) => {
  try {
    await apiClient.delete(`/${id}`, getAuthHeaders(token));
    return { message: "Tenant deleted successfully" };
  } catch (error) {
    console.error(
      "Error deleting tenant:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to delete tenant");
  }
};
