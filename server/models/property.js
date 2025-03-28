const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

// ✅ Define Property Model
const Property = db.define("Property", {
  propertyId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, // ✅ Define Primary Key
  },
  landlordId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  initialCost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unit_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = {
  Property, // ✅ Export model
  getProperties: async (landlordId) => {
    return await Property.findAll({ where: { landlordId } });
  },
  createProperty: async (landlordId, name, location, initialCost, unit_count) => {
    const property = await Property.create({
      landlordId,
      name,
      location,
      initialCost,
      unit_count,
    });
    return property.id;
  },
  getPropertyById: async (id) => {
    return await Property.findByPk(id);
  },
  updateProperty: async (id, name, location, initialCost, unit_count) => {
    const [updated] = await Property.update(
      { name, location, initialCost, unit_count },
      { where: { id } }
    );
    return updated;
  },
  deleteProperty: async (id) => {
    const deleted = await Property.destroy({ where: { id } });
    return deleted;
  },
};
