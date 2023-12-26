const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión a MySQL exitosa');
});

// Controlador para listar libros
app.get('/api/list_vent_lbrs', (req, res) => {
  const sql = 'SELECT * FROM libro';
  db.query(sql, (err, result) => {
    if (err) {
      handleError(res, err);
      return;
    }
    res.json(result);
  });
});

// Controlador para listar cliente de un usuario específico según su DNI
app.get('/api/list_usr/:dni', (req, res) => {
  const dni = req.params.dni;
  const sql = 'SELECT * FROM usuario WHERE usr_dni = ?'; // Ajusta la columna según tu esquema de base de datos
  db.query(sql, [dni], (err, result) => {
    if (err) {
      handleError(res, err);
      return;
    }
    res.json(result);
  });
});

//Función para insertar imagen de perfil por defecto
function usrIMG(nombre){
  const imageUrl = `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(nombre)}`;
  return imageUrl;
}

// Controlador para registrar usuario
app.post('/api/signup', async (req, res) => {

  const sql = 'INSERT INTO usuario (`usr_nom`, `usr_dni`, `usr_email`, `usr_pswd`, `usr_img`) VALUES(?)';
  const values = [req.body.name, req.body.dni, req.body.email, req.body.password, usrIMG(req.body.name)];
  
  db.query(sql, [values], (err, data) => {
    if (err) {
      handleError(res, err);
      return;
    }
    res.json(data);
  });
});

// Controlador para iniciar sesión
app.post('/api/login', (req, res) => {
  const { dni, password } = req.body;
  const values = [dni, password];
  const sql = 'SELECT * FROM usuario WHERE usr_dni = ? AND usr_pswd = ?';
  db.query(sql, values, (err, data) => {
    if (err) {
      handleError(res, err);
      return;
    }
    if (data.length > 0) {
      res.json('Exito');
    } else {
      res.json('Falla');
    }
  });
});

// Controlador para enviar correo
app.post('/api/send-email', async (req, res) => {
  const values = [
    req.body.usr,
    req.body.email,
    req.body.texto,
  ]
  enviarMail = async() => {
      const config = {
          host : process.env.SMTP_HOST,
          port : process.env.SMTP_PORT,
          auth : {
              user: process.env.SMTP_USER,
              pass : process.env.SMTP_PASSWORD
          }
      }

      const mensaje = {
        from: 'jparatupcya@gmail.com',
        to: values[1],
        subject: 'Hola ' + values[0] + ' - Su mensaje ha sido recibido',
        text: values[2]
    } 

      const transport = nodemailer.createTransport(config);
      const info = await transport.sendMail(mensaje);
      console.log(info);
  }

  enviarMail();
})  

function handleError(res, err) {
  console.error('Error:', err);
  res.status(500).send('Error interno del servidor');
}

app.listen(3001, () => {
  console.log('Servidor backend en ejecución en el puerto 3001');
});