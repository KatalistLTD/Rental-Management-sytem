const Report = require("../models/reports");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalRevenue = await Report.getTotalRevenue();
    const unpaidInvoices = await Report.getUnpaidInvoices();
    const monthlyRevenue = await Report.getMonthlyRevenue();
    const paymentMethods = await Report.getPaymentMethodDistribution();
    const topTenants = await Report.getTopPayingTenants();

    res.json({
      totalRevenue,
      unpaidInvoices,
      monthlyRevenue,
      paymentMethods,
      topTenants,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};
