import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/properties"; // Backend API endpoint

const PropertyForm = ({ token: propToken, onPropertyAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rent_price: "",
    unit_count: "",
  });

  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(propToken || ""); // Store token in state

  // ✅ Retrieve token on component mount if not provided as a prop
  useEffect(() => {
    if (!propToken) {
      const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
      setToken(storedToken);
    }
  }, [propToken]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!token) {
      setMessage({ type: "error", text: "Authentication error: No token found." });
      return;
    }

    try {
      console.log("🔥 Token being sent:", token); // Debugging

      console.log("🔥 Sending headers:", {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
      
      const res = await axios.post(API_URL, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      

      setMessage({ type: "success", text: "Property added successfully!" });
      setFormData({ name: "", location: "", rent_price: "", unit_count: "" });

      if (onPropertyAdded) onPropertyAdded(); // Refresh property list
    } catch (error) {
      console.error("Error adding property:", error.response?.data || error.message);
      setMessage({ type: "error", text: "Failed to add property. Please try again." });
    }
  };

  return (
    <div className="max-w-lg p-5 mx-auto mt-5 bg-white border rounded-lg shadow-lg">
      <h2 className="mb-4 text-lg font-semibold">Add New Property</h2>

      {message && (
        <p className={`text-${message.type === "success" ? "green" : "red"}-500 mb-3`}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Property Name" value={formData.name} onChange={handleChange} required className="w-full p-2 mb-3 border rounded" />

        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full p-2 mb-3 border rounded" />

        <input type="number" name="rent_price" placeholder="Rent Price" value={formData.rent_price} onChange={handleChange} required className="w-full p-2 mb-3 border rounded" />

        <input type="number" name="unit_count" placeholder="Number of Units" value={formData.unit_count} onChange={handleChange} required className="w-full p-2 mb-3 border rounded" />

        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
