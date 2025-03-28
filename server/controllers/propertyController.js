const { getProperties, createProperty, updateProperty, deleteProperty } = require("../models/property");

// ✅ Get all properties for a landlord
exports.getAllProperties = async (req, res) => {
  try {
    console.log("Decoded User:", req.user); // Debugging
    const landlordId = req.user.userId;
    console.log("Fetching properties for landlord:", landlordId);

    if (!landlordId) {
      return res.status(400).json({ message: "Invalid landlord ID" });
    }

    const properties = await getProperties(landlordId);
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

// ✅ Create a property
exports.addProperty = async (req, res) => {
  try {
    const { name, location, initialCost, unit_count } = req.body;
    const propertyId = await createProperty(req.user.userId, name, location, initialCost, unit_count);
    res.status(201).json({ id: propertyId, message: "Property added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add property" });
  }
};

// ✅ Update property
exports.editProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, initialCost, unit_count } = req.body;
    const updated = await updateProperty(id, name, location, initialCost, unit_count);
    if (updated) {
      res.json({ message: "Property updated successfully" });
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update property" });
  }
};

// ✅ Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteProperty(id);
    if (deleted) {
      res.json({ message: "Property deleted successfully" });
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete property" });
  }
};
