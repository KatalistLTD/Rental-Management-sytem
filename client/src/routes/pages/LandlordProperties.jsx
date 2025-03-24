import { useState, useEffect } from "react";
import PropertyForm from "../../components/PropertyForm";
import PropertyList from "../../components/PropertyList";

function LandlordProperties() {
  const [token, setToken] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // 🔄 Used to trigger re-fetch

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Retrieved token from localStorage:", storedToken); // Debugging
    setToken(storedToken);
  }, []);

  // ✅ Function to refresh property list
  const refreshList = () => {
    setRefreshTrigger((prev) => prev + 1); // Increments state to trigger re-fetch
  };

  return (
    <div>
      <h1 className="title">Properties</h1>
      {token ? (
        <>
          <PropertyForm token={token} onPropertyAdded={refreshList} />
          <PropertyList token={token} refreshTrigger={refreshTrigger} />
        </>
      ) : (
        <p className="text-red-500">Please log in to manage properties.</p>
      )}
    </div>
  );
}

export default LandlordProperties;
