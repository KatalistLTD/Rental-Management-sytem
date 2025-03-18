import * as Invoice from "../models/Invoice.js";

export const createNewInvoice = async (req, res) => {
  const { tenantId, propertyId, amount, dueDate } = req.body;
  const landlordId = req.user.landlordId;
  const invoiceNumber = `INV-${Date.now()}`;

  try {
    const invoiceId = await Invoice.createInvoice(
      tenantId,
      landlordId,
      propertyId,
      amount,
      dueDate,
      invoiceNumber
    );
    res
      .status(201)
      .json({ id: invoiceId, message: "Invoice created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create invoice" });
  }
};

export const getAllInvoices = async (req, res) => {
  const landlordId = req.user.landlordId;
  const invoices = await Invoice.getInvoices(landlordId);
  res.json(invoices);
};
