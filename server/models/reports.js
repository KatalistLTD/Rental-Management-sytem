const db = require("../config/db");

exports.getTotalRevenue = async () => {
  const [rows] = await db.execute(
    "SELECT SUM(amount) AS total_revenue FROM payments WHERE status = 'completed'"
  );
  return rows[0];
};

exports.getUnpaidInvoices = async () => {
  const [rows] = await db.execute(
    "SELECT SUM(amount) AS total_unpaid FROM invoices WHERE status = 'unpaid'"
  );
  return rows[0];
};

exports.getMonthlyRevenue = async () => {
  const [rows] = await db.execute(
    "SELECT MONTH(created_at) AS month, SUM(amount) AS monthly_revenue FROM payments WHERE status = 'completed' GROUP BY MONTH(created_at)"
  );
  return rows;
};

exports.getPaymentMethodDistribution = async () => {
  const [rows] = await db.execute(
    "SELECT payment_method, COUNT(*) AS count FROM payments GROUP BY payment_method"
  );
  return rows;
};

exports.getTopPayingTenants = async () => {
  const [rows] = await db.execute(
    "SELECT tenant_id, SUM(amount) AS total_paid FROM payments WHERE status = 'completed' GROUP BY tenant_id ORDER BY total_paid DESC LIMIT 5"
  );
  return rows;
};
