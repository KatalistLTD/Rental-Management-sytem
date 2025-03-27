const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    userId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false }, // Removed unique: true
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("Landlord", "Tenant"),
      defaultValue: "Tenant",
    },
  },
  { 
    tableName: "users", 
    timestamps: false,
    indexes: [{ unique: true, fields: ["email"] }] // Define unique constraint here
  }
);

module.exports = User;
