const express = require('express');
const router = express.Router();
const casoController = require('../controllers/casoController');

router.get('/list/:dni', casoController.listarCasosPorCliente);
router.get('/:caso_id', casoController.obtenerDetalleCaso);

module.exports = router;