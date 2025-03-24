import { useEffect, useState } from "react";
import { deleteProperty, fetchProperties } from "../api/propertyApi";

const PropertyList = ({ token, refreshTrigger }) => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      setError(null);
      console.log("Fetching properties...");
      // Debugging log to check if token is available
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
  }, [token, refreshTrigger]); // Reload when refreshTrigger updates

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
    <div>
      <h2 className="mb-4 text-lg font-semibold">Your Properties</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {properties.map((property) => (
          <li key={property.id} className="flex justify-between p-4 mb-2 border">
            <span>{property.name} - {property.location} (Ksh {property.rent_price})</span>
            <button className="p-2 text-white bg-red-500" onClick={() => handleDelete(property.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
