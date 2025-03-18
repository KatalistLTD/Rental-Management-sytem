const db = require("../config/db");

exports.getProperties = (req, res) => {
  const sql = "SELECT * FROM properties WHERE landlord_id = ?";
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
