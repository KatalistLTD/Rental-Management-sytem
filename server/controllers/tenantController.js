const Tenant = require("../models/tenant");

// Get all tenants for a specific landlord
exports.getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.findAll();
    res.json(tenants);
  } catch (error) {
    console.error("Error fetching tenants:", error);
    res.status(500).json({ message: "Failed to retrieve tenants." });
  }
};

// Get a specific tenant by ID
exports.getTenantById = async (req, res) => {
  try {
    const { id } = req.params;
    const tenant = await Tenant.findByPk(id);
    if (!tenant) return res.status(404).json({ error: "Tenant not found" });
    res.json(tenant);
  } catch (error) {
    console.error("Error fetching tenant by ID:", error);
    res.status(500).json({ error: "Database error: Unable to retrieve tenant." });
  }
};

// Create a new tenant
exports.addTenant = async (req, res) => {
  try {
    const { propertyId, name, email, phone, rentAmount, leaseStart, leaseEnd } = req.body;

    // Get landlord ID from the decoded token
    const landlordId = req.user.userId; // Ensure `verifyToken` middleware is correctly attaching user info

    if (!landlordId || !propertyId) {
      return res.status(400).json({ error: "Missing required fields: landlordId or propertyId" });
    }

    // Create a new tenant
    const tenant = await Tenant.create({
      userId: landlordId, // Ensure this matches your model field
      propertyId,
      name,
      email,
      phone,
      rentAmount,
      leaseStart,
      leaseEnd,
    });

    res.status(201).json(tenant);
  } catch (error) {
    console.error("Error creating tenant:", error);
    res.status(500).json({ error: "Database error: Unable to create tenant." });
  }
};


// Update an existing tenant
exports.editTenant = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Tenant.update(req.body, { where: { id } });

    if (updated) {
      const updatedTenant = await Tenant.findByPk(id);
      return res.json(updatedTenant);
    }

    res.status(404).json({ error: "Tenant not found" });
  } catch (error) {
    console.error("Error updating tenant:", error);
    res.status(500).json({ error: "Database error: Unable to update tenant." });
  }
};

// Delete a tenant
exports.deleteTenant = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tenant.destroy({ where: { id } });

    if (deleted) {
      return res.json({ message: "Tenant deleted successfully" });
    }

    res.status(404).json({ error: "Tenant not found" });
  } catch (error) {
    console.error("Error deleting tenant:", error);
    res.status(500).json({ error: "Database error: Unable to delete tenant." });
  }
};
