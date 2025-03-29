import { useEffect, useState } from "react";
import { deleteProperty, fetchProperties } from "../api/propertyApi";

const PropertyList = ({ token, refreshTrigger }) => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      setError(null);
      console.log("Fetching properties...");
      console.log("PropertyList received token:", token);
      if (!token) {
        setError("Authentication error: No token found.");
        return;
      }
      const data = await fetchProperties(token);
      console.log("Fetched Properties:", data);

      if (!data.length) {
        setError("No properties found or failed to load.");
      }
      setProperties(data);
    };
    loadProperties();
  }, [token, refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      console.log(`Deleting property ID: ${id}`);
      await deleteProperty(id, token);
      setProperties(properties.filter((property) => property.id !== id));
      console.log(`Property ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting property:", error.message);
      setError("Failed to delete property. Please try again.");
    }
  };

  return (
    <div className="card p-6 bg-white rounded-lg shadow-md mt-7">
      <h2 className="mb-4 text-xl font-semibold text-gray-700">Your Properties</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">Property Name</th>
              <th className="p-3 border-b">Location</th>
              <th className="p-3 border-b">Initial Cost (Ksh)</th>
              <th className="p-3 border-b">No. of Units</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{property.propertyName}</td>
                <td className="p-3 border-b">{property.location}</td>
                <td className="p-3 border-b">{property.initialCost}</td>
                <td className="p-3 border-b">{property.unit_count}</td>
                <td className="p-3 border-b text-center">
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleDelete(property.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {properties.length === 0 && !error && (
        <p className="mt-4 text-gray-500 text-center">No properties found.</p>
      )}
    </div>
  );
};

export default PropertyList;
