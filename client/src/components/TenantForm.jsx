import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const TenantForm = ({ token, onTenantAdded }) => {
  const initialState = {
    propertyId: "",
    name: "",
    email: "",
    phone: "",
    rentAmount: "",
    leaseStart: "",
    leaseEnd: "",
  };

  const [form, setForm] = useState(initialState);
  const [properties, setProperties] = useState([]); // ✅ Holds property list
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch properties when component mounts
  const fetchProperties = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await axios.get("http://localhost:5000/api/properties", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(data);
    } catch (err) {
      setError("Failed to load properties. Try again.");
      console.error("Error fetching properties:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(form).some((field) => !field)) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/tenants",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Tenant added successfully!");
      setForm(initialState);
      onTenantAdded?.(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add tenant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Add Tenant</h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="space-y-3">
        {/* Property Dropdown */}
        <select
          name="propertyId"
          className="border p-2 w-full rounded-md"
          value={form.propertyId}
          onChange={handleChange}
          required
        >
          <option value="">Select Property</option>
          {properties.length > 0 ? (
            properties.map(({ id, name }) => (
              <option key={id} value={id}>
                {name} (ID: {id})
              </option>
            ))
          ) : (
            <option disabled>Loading properties...</option>
          )}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Tenant Name"
          className="border p-2 w-full rounded-md"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full rounded-md"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border p-2 w-full rounded-md"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rentAmount"
          placeholder="Rent Amount"
          className="border p-2 w-full rounded-md"
          value={form.rentAmount}
          onChange={handleChange}
          required
          min="0"
        />
        <input
          type="date"
          name="leaseStart"
          className="border p-2 w-full rounded-md"
          value={form.leaseStart}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="leaseEnd"
          className="border p-2 w-full rounded-md"
          value={form.leaseEnd}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full mt-4 p-2 rounded-md text-white ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Tenant"}
      </button>
    </form>
  );
};

export default TenantForm;
