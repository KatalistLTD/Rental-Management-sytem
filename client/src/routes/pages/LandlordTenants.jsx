import { useState, useEffect } from "react";
import TenantForm from "../../components/TenantForm";
import TenantList from "../../components/TenantList";

function LandlordTenants() {
  const [token, setToken] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Retrieved token from localStorage:", storedToken);
    setToken(storedToken);
  }, []);

  const refreshList = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <h1 className="title">Tenants</h1>
      {token ? (
        <>
          <TenantForm token={token} onTenantAdded={refreshList} />
          <TenantList token={token} refreshTrigger={refreshTrigger} />
        </>
      ) : (
        <p className="text-red-500">Please log in to manage tenants.</p>
      )}
    </div>
  );
}

export default LandlordTenants;
