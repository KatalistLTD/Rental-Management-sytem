const express = require("express");
const {
  addTenant,
  getAllTenants,
  editTenant,
  deleteTenant,
} = require("../controllers/tenantController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getAllTenants); // ✅ Fetch all tenants
router.post("/", verifyToken, addTenant); // ✅ Add a new tenant
router.put("/update/:id", verifyToken, editTenant); // ✅ Update tenant
router.delete("/:id", verifyToken, deleteTenant); // ✅ Delete tenant

module.exports = router;
