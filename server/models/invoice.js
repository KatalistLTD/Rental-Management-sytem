import db from "../config/db.js";

export const createInvoice = async (
  tenantId,
  landlordId,
  propertyId,
  amount,
  dueDate,
  invoiceNumber
) => {
  const [result] = await db.execute(
    "INSERT INTO invoices (tenant_id, landlord_id, property_id, amount, due_date, invoice_number) VALUES (?, ?, ?, ?, ?, ?)",
    [tenantId, landlordId, propertyId, amount, dueDate, invoiceNumber]
  );
  return result.insertId;
};

export const getInvoices = async (landlordId) => {
  const [rows] = await db.execute(
    "SELECT * FROM invoices WHERE landlord_id = ?",
    [landlordId]
  );
  return rows;
};
