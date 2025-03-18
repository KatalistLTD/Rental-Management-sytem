const Tenant = require("../models/tenant");

// Get all tenants for a specific landlord
exports.getAllTenants = async (req, res) => {
  try {
    const { landlordId } = req.user;
    const tenants = await Tenant.getTenants(landlordId);
    res.status(200).json(tenants);
  } catch (error) {
    console.error("Error fetching tenants:", error);
    res.status(500).json({ error: "Failed to fetch tenants" });
  }
};

// Add a new tenant
exports.addTenant = async (req, res) => {
  try {
    const { propertyId, name, email, phone, rentAmount, leaseStart, leaseEnd } =
      req.body;
    const landlordId = req.user.landlordId;

    if (!name || !email || !phone || !rentAmount || !leaseStart || !leaseEnd) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const tenantId = await Tenant.createTenant(
      landlordId,
      propertyId,
      name,
      email,
      phone,
      rentAmount,
      leaseStart,
      leaseEnd
    );

    res
      .status(201)
      .json({ id: tenantId, message: "Tenant added successfully" });
  } catch (error) {
    console.error("Error adding tenant:", error);
    res.status(500).json({ error: "Failed to add tenant" });
  }
};

// Edit tenant details
exports.editTenant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, rentAmount, leaseStart, leaseEnd } = req.body;

    const existingTenant = await Tenant.getTenantById(id);
    if (!existingTenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    await Tenant.updateTenant(
      id,
      name,
      email,
      phone,
      rentAmount,
      leaseStart,
      leaseEnd
    );
    res.json({ message: "Tenant updated successfully" });
  } catch (error) {
    console.error("Error updating tenant:", error);
    res.status(500).json({ error: "Failed to update tenant" });
  }
};

// Delete a tenant
exports.deleteTenant = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTenant = await Tenant.getTenantById(id);
    if (!existingTenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    await Tenant.deleteTenant(id);
    res.json({ message: "Tenant deleted successfully" });
  } catch (error) {
    console.error("Error deleting tenant:", error);
    res.status(500).json({ error: "Failed to delete tenant" });
  }
};
