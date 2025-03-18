import * as Property from "../models/Property.js";

export const getAllProperties = async (req, res) => {
  const { landlordId } = req.user;
  const properties = await Property.getProperties(landlordId);
  res.json(properties);
};

export const addProperty = async (req, res) => {
  const { name, location, rent_price, unit_count } = req.body;
  const landlordId = req.user.landlordId;

  try {
    const propertyId = await Property.createProperty(
      landlordId,
      name,
      location,
      rent_price,
      unit_count
    );
    res
      .status(201)
      .json({ id: propertyId, message: "Property added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add property" });
  }
};

export const editProperty = async (req, res) => {
  const { id } = req.params;
  const { name, location, rent_price, unit_count } = req.body;

  try {
    await Property.updateProperty(id, name, location, rent_price, unit_count);
    res.json({ message: "Property updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update property" });
  }
};

export const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    await Property.deleteProperty(id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete property" });
  }
};
