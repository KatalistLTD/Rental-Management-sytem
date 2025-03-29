const { DataTypes } = require("sequelize");
const db = require("../config/db"); // Ensure this is your Sequelize instance

const Tenant = db.define("Tenant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  propertyName: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rentAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  leaseStart: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  leaseEnd: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: "tenants",
  timestamps: false, // Set to true if using createdAt and updatedAt
});

module.exports = Tenant;
