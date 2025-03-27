import { useEffect, useState } from "react";
import { deleteTenant, fetchTenants } from "../api/tenantApi";

const TenantList = ({ token }) => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const loadTenants = async () => {
      console.log("Received token in TenantList:", token);
      
      if (!token) {
        console.error("No token found. Cannot fetch tenants.");
        return;
      }
  
      try {
        const tenants = await fetchTenants(token);
        setTenants(tenants);
      } catch (error) {
        console.error("Failed to fetch tenants:", error);
        setError(error.message);
      }
    };
  
    loadTenants();
  }, [token]);
  

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;

    try {
      await deleteTenant(id, token);
      setTenants((prevTenants) =>
        prevTenants.filter((tenant) => tenant.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete tenant:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Tenants</h2>

      {tenants.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Email
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Phone
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Rent (Ksh)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Lease Start
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Lease End
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {tenant.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {tenant.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {tenant.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Ksh {tenant.rent_amount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {tenant.lease_start}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {tenant.lease_end}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(tenant.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No tenants available.</p>
      )}
    </div>
  );
};

export default TenantList;
