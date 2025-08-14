const db = require('../config/db');
const handleError = require('../utils/handleError');

// Controlador para listar todos los servicios
exports.listarServicios = (req, res) => {
  const sql = 'SELECT * FROM servicio';
  db.query(sql, (err, result) => {
    if (err) return handleError(res, err, 'listar servicios');
    res.json(result);
  });
};