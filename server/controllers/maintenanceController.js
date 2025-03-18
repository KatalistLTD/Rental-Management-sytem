const db = require("../config/db");

exports.createRequest = (req, res) => {
  const { description, priority } = req.body;
  const sql =
    'INSERT INTO maintenance_requests (tenant_id, description, priority, status) VALUES (?, ?, ?, "Pending")';
  db.query(sql, [req.user.id, description, priority], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Request submitted successfully" });
  });
};

exports.getRequests = (req, res) => {
  const sql =
    "SELECT * FROM maintenance_requests WHERE tenant_id = ? ORDER BY created_at DESC";
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.updateRequest = (req, res) => {
  const { id, status } = req.body;
  const sql = "UPDATE maintenance_requests SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Request updated successfully" });
  });
};
