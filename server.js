// =============================================
//  ARCHIVO DEL SERVIDOR - ESTRUCTURA CORREGIDA
// =============================================

// --- 1. IMPORTACIONES ---
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

// --- 2. CONFIGURACIÓN INICIAL Y VARIABLES DE ENTORNO ---
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 3001;
const app = express();

// --- 3. MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- 4. CONEXIÓN A LA BASE DE DATOS ---
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Error fatal al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión a MySQL exitosa');
});

// --- 5. FUNCIONES DE UTILIDAD (DECLARADAS ANTES DE SU USO) ---

// **CORRECCIÓN CLAVE**: Mover esta función al principio.
function handleError(res, err, context = 'un especificado') {
  console.error(`Error en el contexto '${context}':`, err);
  res.status(500).send('Error interno del servidor');
}

function usrIMG(nombre) {
  const imageUrl = `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(nombre)}`;
  return imageUrl;
}

// --- 6. DEFINICIÓN DE RUTAS (ENDPOINTS DE LA API) ---

// Controlador para listar todos los servicios
app.get('/api/servicios', (req, res) => {
  const sql = 'SELECT * FROM servicio';
  db.query(sql, (err, result) => {
    if (err) return handleError(res, err, 'listar servicios');
    res.json(result);
  });
});

// Controlador para obtener datos de UN usuario específico por DNI
app.get('/api/list_usr/:dni', (req, res) => {
  const dni = req.params.dni;
  const sql = 'SELECT * FROM usuario WHERE usr_dni = ?';
  db.query(sql, [dni], (err, result) => {
    if (err) return handleError(res, err, 'obtener usuario por dni');
    res.json(result);
  });
});

// **ESTA RUTA AHORA FUNCIONARÁ CORRECTAMENTE**
// Controlador para listar TODOS los casos de un cliente específico por DNI
app.get('/api/list_casos/:dni', (req, res) => {
    const dni = req.params.dni;
    const sql = `
      SELECT c.*, CONCAT(a.usr_nom, ' ', a.usr_ape) AS nombre_abogado
      FROM casos AS c
      LEFT JOIN usuario AS a ON c.abogado_dni = a.usr_dni
      WHERE c.cliente_dni = ?
      ORDER BY c.fecha_actualizacion DESC;
    `;
    db.query(sql, [dni], (err, result) => {
        if (err) return handleError(res, err, 'listar casos de cliente');
        res.json(result);
    });
});

// Controlador para registrar un nuevo usuario
app.post('/api/signup', async (req, res) => {
  const nuevoUsuario = {
    usr_nom: req.body.name,
    usr_dni: req.body.dni,
    usr_email: req.body.email,
    usr_pswd: req.body.password, // ALERTA DE SEGURIDAD: ¡Implementar bcrypt!
    usr_img: usrIMG(req.body.name)
  };
  const sql = 'INSERT INTO usuario SET ?';
  db.query(sql, nuevoUsuario, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'El DNI o el correo electrónico ya están registrados.' });
      }
      return handleError(res, err, 'registrar usuario');
    }
    res.status(201).json({ message: 'Usuario registrado con éxito', userId: result.insertId });
  });
});

// Controlador para iniciar sesión
// En tu archivo del servidor backend (Node.js)

app.post('/api/login', (req, res) => {
  const { dni, password } = req.body;

  // --- LÍNEAS DE DEPURACIÓN CRUCIALES ---
  console.log('--- INTENTO DE LOGIN RECIBIDO ---');
  console.log(`Buscando DNI (tipo: ${typeof dni}):`, dni);
  console.log(`Buscando Contraseña (tipo: ${typeof password}):`, password);
  // ------------------------------------

  const sql = 'SELECT * FROM usuario WHERE usr_dni = ? AND usr_pswd = ?';
  
  db.query(sql, [dni, password], (err, data) => {
    if (err) {
      console.error("Error en la consulta de login:", err);
      return res.status(500).json({ message: 'Error en la BD' });
    }
    
    // --- LÍNEA DE DEPURACIÓN ADICIONAL ---
    console.log(`Filas encontradas: ${data.length}`);
    // ------------------------------------

    if (data.length > 0) {
      res.json('Exito');
    } else {
      res.json('Falla');
    }
  });
});

// Controlador para enviar correo (simplificado y corregido)
app.post('/api/send-email', async (req, res) => {
    const { usr, email, msj } = req.body; // Usa los nombres correctos de tus campos

    if (!usr || !email || !msj) {
        return res.status(400).json({ message: 'Faltan datos en el formulario.' });
    }

    try {
        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
        await transport.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `Confirmación de su mensaje, ${usr}`,
            text: `Hemos recibido su mensaje: "${msj}". Nos pondremos en contacto pronto.`
        });
        res.json({ message: 'Correo enviado con éxito.' });
    } catch (err) {
        handleError(res, err, 'enviar correo');
    }
});

// --- 7. INICIO DEL SERVIDOR ---
app.listen(port, () => {
  console.log(`Servidor backend en ejecución en el puerto ${port}`);
});