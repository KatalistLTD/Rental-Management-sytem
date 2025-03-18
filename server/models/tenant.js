const db = require("../config/db");

class Tenant {
  // Get all tenants for a specific landlord
  static async getTenants(landlordId) {
    const [rows] = await db.execute(
      "SELECT * FROM tenants WHERE landlord_id = ?",
      [landlordId]
    );
    return rows;
  }

  // Get a specific tenant by ID
  static async getTenantById(id) {
    const [rows] = await db.execute("SELECT * FROM tenants WHERE id = ?", [id]);
    return rows[0];
  }

  // Create a new tenant
  static async createTenant(
    landlordId,
    propertyId,
    name,
    email,
    phone,
    rentAmount,
    leaseStart,
    leaseEnd
  ) {
    const [result] = await db.execute(
      `INSERT INTO tenants 
      (landlord_id, property_id, name, email, phone, rent_amount, lease_start, lease_end) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        landlordId,
        propertyId,
        name,
        email,
        phone,
        rentAmount,
        leaseStart,
        leaseEnd,
      ]
    );
    return result.insertId;
  }

  // Update an existing tenant
  static async updateTenant(
    id,
    name,
    email,
    phone,
    rentAmount,
    leaseStart,
    leaseEnd
  ) {
    await db.execute(
      `UPDATE tenants 
      SET name = ?, email = ?, phone = ?, rent_amount = ?, lease_start = ?, lease_end = ? 
      WHERE id = ?`,
      [name, email, phone, rentAmount, leaseStart, leaseEnd, id]
    );
  }

  // Delete a tenant
  static async deleteTenant(id) {
    await db.execute("DELETE FROM tenants WHERE id = ?", [id]);
  }
}

module.exports = Tenant;
