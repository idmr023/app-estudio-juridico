const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');

// La ruta aquí es '/', porque el prefijo '/api/servicios' se definirá en server.js
router.get('/', servicioController.listarServicios);

module.exports = router;