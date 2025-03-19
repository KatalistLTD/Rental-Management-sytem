const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const landlordRoutes = require("./routes/landlordRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const reportRoutes = require("./routes/reportRoutes");

const sequelize = require("./config/db");

sequelize
  .sync({ alter: true }) // Will update DB schema if needed
  .then(() => console.log("✅ Database synchronized"))
  .catch((err) => console.error("❌ Error syncing database:", err));

dotenv.config();

const app = express();

// Ensure database connection
db.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database connection error:", err));

db.sync({ alter: true }) // Ensure tables are updated
  .then(() => console.log("✅ Database synchronized"))
  .catch((err) => console.error("❌ Error syncing database:", err));

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/", authRoutes);
app.use("/api/landlord", landlordRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/reports", reportRoutes);

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
