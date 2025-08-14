const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.registrarUsuario);
router.post('/login', authController.iniciarSesion);
router.get('/user/:dni', authController.obtenerUsuario);

module.exports = router;