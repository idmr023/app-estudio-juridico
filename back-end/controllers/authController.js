const db = require('../config/db');
const handleError = require('../utils/handleError');
const usrIMG = require('../utils/usrIMG');
// ¡IMPORTANTE! Deberías añadir bcrypt para la seguridad de las contraseñas
// const bcrypt = require('bcrypt');

exports.obtenerUsuario = (req, res) => {
  const dni = req.params.dni;
  const sql = 'SELECT usr_dni, usr_nom, usr_email, usr_img FROM usuario WHERE usr_dni = ?';
  db.query(sql, [dni], (err, result) => {
    if (err) return handleError(res, err, 'obtener usuario por dni');
    if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result[0]);
  });
};

exports.registrarUsuario = (req, res) => {
  const nuevoUsuario = {
    usr_nom: req.body.name, usr_dni: req.body.dni, usr_email: req.body.email,
    usr_pswd: req.body.password, // Aquí deberías hashear la contraseña con bcrypt
    usr_img: usrIMG(req.body.name)
  };
  const sql = 'INSERT INTO usuario SET ?';
  db.query(sql, nuevoUsuario, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'El DNI o el correo ya están registrados.' });
      return handleError(res, err, 'registrar usuario');
    }
    res.status(201).json({ message: 'Usuario registrado con éxito', userId: result.insertId });
  });
};

// backend/controllers/authController.js

exports.iniciarSesion = (req, res) => {
  const { dni, password } = req.body;

  // --- LÍNEAS DE DEPURACIÓN CRUCIALES ---
  console.log('--- INTENTO DE LOGIN RECIBIDO EN EL CONTROLADOR ---');
  console.log('Datos recibidos en req.body:', req.body);
  console.log(`Buscando DNI (tipo: ${typeof dni}):`, dni);
  console.log(`Buscando Contraseña (tipo: ${typeof password}):`, password);
  // ------------------------------------

  const sql = 'SELECT * FROM usuario WHERE usr_dni = ? AND usr_pswd = ?';
  
  db.query(sql, [dni, password], (err, data) => {
    if (err) return handleError(res, err, 'iniciar sesión');
    
    // --- LÍNEA DE DEPURACIÓN ADICIONAL ---
    console.log(`La consulta SQL encontró ${data.length} filas.`);
    // ------------------------------------

    if (data.length > 0) {
      const { usr_pswd, ...userData } = data[0];
      res.json({ status: 'Exito', user: userData });
    } else {
      res.status(401).json({ status: 'Falla', message: 'DNI o contraseña incorrectos.' });
    }
  });
};