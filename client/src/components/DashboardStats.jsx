import { useEffect, useState } from "react";
import { fetchReports } from "../api/reportApi";

const DashboardStats = ({ token }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchReports(token);
      setStats(data);
    };
    loadStats();
  }, [token]);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white shadow p-4 rounded">
        <h3 className="text-lg font-semibold">Total Revenue</h3>
        <p className="text-xl font-bold text-green-600">
          Ksh {stats.totalRevenue.total_revenue || 0}
        </p>
      </div>
      <div className="bg-white shadow p-4 rounded">
        <h3 className="text-lg font-semibold">Unpaid Invoices</h3>
        <p className="text-xl font-bold text-red-600">
          Ksh {stats.unpaidInvoices.total_unpaid || 0}
        </p>
      </div>
    </div>
  );
};

export default DashboardStats;
