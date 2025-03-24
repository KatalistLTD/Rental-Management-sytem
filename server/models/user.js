const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import Sequelize instance

const User = sequelize.define(
  "User",
  {
    userId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("Landlord", "Tenant"),
      defaultValue: "Tenant",
    },
  },
  { tableName: "users", timestamps: false }
);

module.exports = User;
