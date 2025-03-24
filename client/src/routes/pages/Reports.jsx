import { useEffect, useState } from "react";
import { fetchReports } from "../../api/reportApi";
import DashboardStats from "../../components/DashboardStats";
import MonthlyRevenueChart from "../../components/MonthlyRevenueChart";
import PaymentMethodChart from "../../components/PaymentMethodChart";

const Reports = ({ token }) => {
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
    <div className="p-6">
      <h1 className="title">Reports</h1>
      <DashboardStats token={token} />
      <MonthlyRevenueChart data={stats.monthlyRevenue} />
      <PaymentMethodChart />
    </div>
  );
};

export default Reports;
