import db from "../config/db.js";

export const getProperties = async (landlordId) => {
  const [rows] = await db.execute(
    "SELECT * FROM properties WHERE landlord_id = ?",
    [landlordId]
  );
  return rows;
};

export const createProperty = async (
  landlordId,
  name,
  location,
  rent_price,
  unit_count
) => {
  const [result] = await db.execute(
    "INSERT INTO properties (landlord_id, name, location, rent_price, unit_count) VALUES (?, ?, ?, ?, ?)",
    [landlordId, name, location, rent_price, unit_count]
  );
  return result.insertId;
};

export const updateProperty = async (
  id,
  name,
  location,
  rent_price,
  unit_count
) => {
  await db.execute(
    "UPDATE properties SET name = ?, location = ?, rent_price = ?, unit_count = ? WHERE id = ?",
    [name, location, rent_price, unit_count, id]
  );
};

export const deleteProperty = async (id) => {
  await db.execute("DELETE FROM properties WHERE id = ?", [id]);
};
