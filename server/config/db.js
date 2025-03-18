const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Set to true if you want SQL queries to be logged
  }
);

sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to MySQL using Sequelize"))
  .catch((err) => console.error("❌ Database connection failed:", err));

module.exports = sequelize;
