const db = require("../config/db");

exports.createPayment = async (
  tenantId,
  landlordId,
  propertyId,
  amount,
  paymentMethod,
  transactionId,
  status
) => {
  const [result] = await db.execute(
    "INSERT INTO payments (tenant_id, landlord_id, property_id, amount, payment_method, transaction_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      tenantId,
      landlordId,
      propertyId,
      amount,
      paymentMethod,
      transactionId,
      status,
    ]
  );
  return result.insertId;
};

exports.getPayments = async (landlordId) => {
  const [rows] = await db.execute(
    "SELECT * FROM payments WHERE landlord_id = ?",
    [landlordId]
  );
  return rows;
};
